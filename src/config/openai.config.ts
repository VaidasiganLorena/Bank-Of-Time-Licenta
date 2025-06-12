import OpenAI from "openai"

const OPENAI_CONFIG = {
  apiKey: "",
  dangerouslyAllowBrowser: true,
}

if (!OPENAI_CONFIG.apiKey) {
  throw new Error(
    "OpenAI API key is not set. Please set REACT_APP_OPENAI_API_KEY in your environment variables."
  )
}

export const openai = new OpenAI(OPENAI_CONFIG)
