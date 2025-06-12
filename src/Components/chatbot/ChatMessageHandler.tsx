import { openai } from "../../config/openai.config"
import { CHATBOT_ERROR_MESSAGE, CHATBOT_PROMPT } from "./constatnts"
import { useNavigate } from "react-router-dom"

interface Message {
  text: string
  isUser: boolean
  redirectTo?: string
}

interface UseChatMessageProps {
  onSendMessage?: (message: string) => void
  onMessageProcessed: (message: Message) => void
  onError: (error: string) => void
  onTypingStateChange: (isTyping: boolean) => void
  messages: Message[]
  isModalOpen: boolean
}

export const useChatMessage = ({
  onSendMessage,
  onMessageProcessed,
  onError,
  onTypingStateChange,
  messages,
  isModalOpen,
}: UseChatMessageProps) => {
  const navigate = useNavigate()

  const processMessage = async (inputMessage: string) => {
    onTypingStateChange(true)

    try {
      if (onSendMessage) {
        onSendMessage(inputMessage)
      } else {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system" as const,
              content: CHATBOT_PROMPT,
            },
            ...messages.map((msg) => ({
              role: msg.isUser ? ("user" as const) : ("assistant" as const),
              content: msg.text,
            })),
            { role: "user" as const, content: inputMessage },
          ],
          model: "gpt-3.5-turbo",
          temperature: 0.3,
          max_tokens: 250,
          top_p: 0.8,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        })

        const responseText =
          completion.choices[0]?.message?.content || CHATBOT_ERROR_MESSAGE
        const lines = responseText.split("\n")
        const redirectLine = lines.find((line) => line.startsWith("REDIRECT:"))

        let redirectTo = ""
        let cleanText = responseText

        if (redirectLine) {
          redirectTo = redirectLine.replace("REDIRECT:", "").trim()
          cleanText = lines
            .filter((line) => !line.startsWith("REDIRECT:"))
            .join("\n")
            .trim()
        }

        const botResponse: Message = {
          text: cleanText,
          isUser: false,
          redirectTo: redirectTo,
        }

        onMessageProcessed(botResponse)
      }
    } catch (err) {
      console.error("Error generating response:", err)
      const errorMessage = CHATBOT_ERROR_MESSAGE
      onError(errorMessage)
      onMessageProcessed({
        text: errorMessage,
        isUser: false,
      })
    } finally {
      onTypingStateChange(false)
    }
  }

  return { processMessage }
}
