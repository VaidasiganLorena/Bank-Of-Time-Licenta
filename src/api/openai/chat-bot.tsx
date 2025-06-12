import { openai } from "../../config/openai.config"

export const chatBot = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    })
    return completion.choices[0]?.message?.content || "No response"
  } catch (error) {
    console.error("Error:", error)
    return "Error occurred while fetching response"
  }
}
