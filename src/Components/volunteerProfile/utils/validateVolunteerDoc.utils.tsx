import { openai } from "../../../config/openai.config"

export const validateVolunteerDocument = async (
  extractedText: string
): Promise<{ isValid: boolean; reason?: string }> => {
  try {
    const validationPrompt = `Analizează următorul text extras dintr-un document și determină dacă reprezintă o adeverință, certificat sau diplomă validă de voluntariat.

TEXT EXTRAS:
${extractedText}

INSTRUCȚIUNI:
1. Verifică dacă textul conține elemente specifice activităților de voluntariat
2. Caută mențiuni despre: voluntariat, activități sociale, ONG, fundații, asociații, ore de voluntariat, certificare, adeverință
3. Verifică dacă pare să fie un document oficial (diplomă, certificat, adeverință, etc.)
4. Exclude documente care nu sunt legate de voluntariat (facturi, contracte, etc.)

Returnează STRICT o valoare isValid, booleana true daca este o adeverință de voluntariat validă, false în caz contrar.

IMPORTANT: Returnează DOAR valoarea booleana, fără text suplimentar.`

    const validationCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: validationPrompt }],
      model: "gpt-4",
      temperature: 0.1,
      max_tokens: 200,
    })

    const response = validationCompletion.choices[0]?.message?.content

    return {
      isValid: response === "true" ? true : false,
    }
  } catch (error) {
    console.error("Error validating volunteer document:", error)
    return {
      isValid: false,
      reason: "Eroare la validarea documentului",
    }
  }
}
