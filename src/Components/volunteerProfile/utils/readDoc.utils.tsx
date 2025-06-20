import { createWorker } from "tesseract.js"

export const extractTextFromImage = async (
  imageFile: File
): Promise<string> => {
  let worker = null
  try {
    worker = await createWorker()

    await worker.loadLanguage("ron")
    await worker.initialize("ron")

    const result = await worker.recognize(imageFile)

    const text = result.data.text
    console.log(text)

    await worker.terminate()

    return text.trim()
  } catch (error: any) {
    if (worker) {
      try {
        await worker.terminate()
      } catch (terminateError) {
        console.error("Error terminating worker:", terminateError)
      }
    }
    throw new Error(
      `Failed to extract text from image: ${error.message}. Please make sure the image is clear and contains readable text.`
    )
  }
}
