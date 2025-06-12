import { createStyles, keyframes } from "@mantine/core"

const bounce = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-10px)" },
})

const fadeIn = keyframes({
  from: { opacity: 0, transform: "scale(0.95)" },
  to: { opacity: 1, transform: "scale(1)" },
})

export const useChatbotStyles = createStyles((theme: any) => ({
  chatContainer: {
    backgroundColor: "#f9f5f1e6",
    borderRadius: 20,
    height: "82vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  messageInput: {
    backgroundColor: "#ffffff",
    width: "100%",
    marginTop: theme.spacing.md,
    transition: "all 0.3s ease",
    borderRadius: "20px",
    border: "2px solid transparent",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    "&:focus-within": {
      borderColor: "#28886f40",
      boxShadow: "0 4px 12px rgba(40, 136, 111, 0.15)",
      transform: "translateY(-2px)",
    },
    "& .mantine-TextInput-input": {
      backgroundColor: "transparent",
      border: "none",
      padding: "12px 20px",
      fontSize: "15px",
      "&::placeholder": {
        color: "#909296",
        transition: "all 0.2s ease",
      },
      "&:focus": {
        "&::placeholder": {
          opacity: 0.7,
          transform: "translateX(5px)",
        },
      },
    },
    "& .mantine-TextInput-rightSection": {
      width: "50px",
      right: "5px",
    },
  },
  sendButton: {
    backgroundColor: "#28886f",
    color: "white",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#154639",
      transform: "scale(1.1) rotate(5deg)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
    "&[data-disabled]": {
      backgroundColor: "#e9ecef",
      color: "#909296",
      cursor: "not-allowed",
      "&:hover": {
        transform: "none",
      },
    },
  },
  inputWrapper: {
    position: "relative",
    marginTop: "auto",
    padding: theme.spacing.md,
    backdropFilter: "blur(10px)",
    borderRadius: "0 0 20px 20px",
  },
  message: {
    maxWidth: "90%",
    padding: theme.spacing.sm,
    margin: theme.spacing.md,
    borderRadius: 15,
    marginBottom: theme.spacing.sm,
    position: "relative",
    animation: `${fadeIn} 0.3s ease-out`,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  userMessage: {
    backgroundColor: "#28886f",
    color: "white",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: "auto",
    width: "fit-content",
    maxWidth: "70%",
    fontSize: "0.9em",
    padding: "8px 12px",

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      right: 13,
      width: 0,
      height: 0,
      border: "10px solid transparent",
      borderTopColor: "#28886f",
      borderBottom: 0,
      borderRight: 0,
      marginLeft: -10,
      marginBottom: -10,
    },
  },
  botMessage: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    width: "fit-content",
    maxWidth: "80%",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 20,
      width: 0,
      height: 0,
      border: "10px solid transparent",
      borderTopColor: "#ffffff",
      borderBottom: 0,
      borderLeft: 0,
      marginRight: -10,
      marginBottom: -10,
    },
  },
  chatBubble: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 1000,
    cursor: "pointer",
    transition: "all 0.3s ease",
    animation: `${bounce} 2s ease-in-out infinite`,
    "&:hover": {
      transform: "scale(1.1) rotate(5deg)",
      filter: "brightness(1.1)",
    },
  },
  modal: {
    ".mantine-Modal-modal": {
      backgroundColor: "#ffffff80",
      borderRadius: 30,
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      animation: `${fadeIn} 0.3s ease-out`,
    },
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#fb6b6b",
    animation: `${bounce} 1s ease-in-out infinite`,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "rotate(90deg)",
      color: "#fb6b6b",
    },
  },
  typingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.md,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    width: "fit-content",
    marginBottom: theme.spacing.sm,
  },
  dot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#28886f",
    borderRadius: "50%",
    animation: `${bounce} 1s infinite`,
    "&:nth-child(2)": {
      animationDelay: "0.2s",
    },
    "&:nth-child(3)": {
      animationDelay: "0.4s",
    },
  },
}))
