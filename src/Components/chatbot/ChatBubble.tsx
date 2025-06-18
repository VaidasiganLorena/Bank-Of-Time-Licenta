import {
  ThemeIcon,
  Text,
  ScrollArea,
  TextInput,
  Modal,
  ActionIcon,
  Badge,
  keyframes,
  Paper,
  Button,
} from "@mantine/core"
import {
  IconMessageCircle,
  IconX,
  IconSend,
  IconArrowRight,
} from "@tabler/icons-react"
import { useState, useRef, useEffect } from "react"
import { useChatbotStyles } from "./chatbot.styles"
import { useChatMessage } from "./ChatMessageHandler"
import { useNavigate } from "react-router-dom"

const ICON_SIZE = 60

const bounce = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-10px)" },
})

const fadeIn = keyframes({
  from: { opacity: 0, transform: "scale(0.95)" },
  to: { opacity: 1, transform: "scale(1)" },
})

interface Message {
  text: string
  isUser: boolean
  redirectTo?: string
}

interface ChatBubbleProps {
  onSendMessage?: (message: string) => void
  initialMessages?: Message[]
}

export const ChatBubble = ({
  onSendMessage,
  initialMessages = [],
}: ChatBubbleProps) => {
  const { classes } = useChatbotStyles()
  const viewport = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessages.length === 0) {
      return [
        {
          text: "Bună, Lorena! Sunt asistentul tău pentru Banca Timpului. Cum te pot ajuta astăzi?",
          isUser: false,
        },
      ]
    }
    return initialMessages
  })
  const [inputMessage, setInputMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const { processMessage } = useChatMessage({
    onSendMessage,
    onMessageProcessed: (message) => {
      setMessages((prev) => [...prev, message])
      if (!isModalOpen) {
        setUnreadMessages((prev) => prev + 1)
      }
    },
    onError: (errorMessage) => setError(errorMessage),
    onTypingStateChange: setIsTyping,
    messages,
    isModalOpen,
  })

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        text: inputMessage,
        isUser: true,
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
      setError(null)

      await processMessage(inputMessage)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
    setUnreadMessages(0)
  }

  const handleRedirect = (path: string) => {
    navigate(path)
    setIsModalOpen(false)
  }

  return (
    <>
      <div
        className={classes.chatBubble}
        onClick={isModalOpen ? () => setIsModalOpen(false) : handleOpenModal}
      >
        <ThemeIcon size={60} radius={30} color="#28886f">
          {isModalOpen ? <IconX size={30} /> : <IconMessageCircle size={30} />}
        </ThemeIcon>
        {unreadMessages > 0 && !isModalOpen && (
          <Badge className={classes.notificationBadge} size="sm" radius="xl">
            {unreadMessages}
          </Badge>
        )}
      </div>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
        className={classes.modal}
        withCloseButton={false}
        padding={0}
        radius={20}
        styles={{
          inner: {
            top: "calc(100vh/2 - 420px)",
            left: "calc(100vw/2 - 260px)",
          },
          close: { display: "none" },
        }}
      >
        <Paper className={classes.chatContainer}>
          <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}>
            <ActionIcon onClick={() => setIsModalOpen(false)}>
              <IconX size={20} />
            </ActionIcon>
          </div>
          <ScrollArea h="100%" type="auto" viewportRef={viewport}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${classes.message} ${
                  message.isUser ? classes.userMessage : classes.botMessage
                }`}
              >
                <Text size="sm">{message.text}</Text>
                {message.redirectTo && (
                  <Button
                    size="xs"
                    variant="light"
                    color="teal"
                    rightIcon={<IconArrowRight size={14} />}
                    onClick={() => handleRedirect(message.redirectTo!)}
                    mt={8}
                  >
                    Accesează pagina
                  </Button>
                )}
              </div>
            ))}
            {isTyping && (
              <div className={classes.typingIndicator}>
                <div className={classes.dot} />
                <div className={classes.dot} />
                <div className={classes.dot} />
              </div>
            )}
          </ScrollArea>
          <div className={classes.inputWrapper}>
            <TextInput
              className={classes.messageInput}
              placeholder="Scrie aici mesajul tău..."
              value={inputMessage}
              onChange={(event) => setInputMessage(event.currentTarget.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSendMessage()
                }
              }}
              rightSection={
                <ActionIcon
                  className={classes.sendButton}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                >
                  <IconSend size={18} />
                </ActionIcon>
              }
            />
          </div>
        </Paper>
      </Modal>
    </>
  )
}
