import { openai } from "../../../config/openai.config"
import { CreateVolunteerDocumentInput } from "../../../api/volunteer-doc/useCreateDoc"

export const generateDocData = async (
  extractedText: string
): Promise<CreateVolunteerDocumentInput> => {
  try {
    const correctionPrompt = `Corectează următorul text în limba română, adăugând toate diacriticele lipsă și corectând greșelile gramaticale și ortografice. Returnează DOAR textul corectat, fără explicații suplimentare.

Textul original: ${extractedText}

Textul corectat:`

    const correctionCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: correctionPrompt }],
      model: "gpt-4",
      temperature: 0.1,
      max_tokens: 2000,
    })

    const correctedText =
      correctionCompletion.choices[0]?.message?.content?.trim() || extractedText
    console.log(correctedText, "correctedText")
    const extractionPrompt = `Analizează următorul text corectat în limba română și extrage informațiile structurate conform specificațiilor de mai jos.

TEXT CORECTAT:
${correctedText}

INSTRUCȚIUNI DE EXTRAGERE:
1. Analizează textul cu atenție și extrage toate informațiile relevante
2. Pentru câmpurile care nu sunt menționate explicit, fă estimări inteligente bazate pe context
3. Pentru date, folosește formatul dd.mm.yyyy
4. Pentru liste (responsibilities, skills), returnează array-uri JSON valide
5. Pentru ore, returnează un număr întreg

Returnează STRICT un obiect JSON valid cu următoarea structură:

{
  "eventName": string, // Numele evenimentului sau activității. Dacă nu este specificat clar, dedu-l din titlu, locație sau context (ex: "Ziua Mediului", "Tabăra de vară", "Proiect Educațional").
  "organization": string, // Numele organizației sau instituției. Caută termeni ca "organizat de", "Fundația", "Asociația", "Școala", "ONG", etc.
  "dateFrom": string, // Data de început a activității, format: dd.mm.yyyy. Dacă e menționată doar o lună sau un an, dedu o dată aproximativă (ex: "01.06.2023").
  "dateTo": string, // Data de încheiere, format: dd.mm.yyyy. Dacă e o singură zi, ambele date pot fi identice. Dacă e o perioadă vagă (ex: „două săptămâni în iulie 2023”), dedu data estimată.
  "role": string, // Rolul voluntarului (ex: "voluntar", "asistent", "coordonator", "trainer", etc.). Caută verbe precum "am ajutat", "m-am ocupat", "am fost responsabil", etc.
  "validation": string, // "true" dacă se menționează adeverință, certificat, validare; altfel "false". Poți presupune "true" dacă e o activitate formală cu mențiune despre ore sau ONG.
  "hours": number, // Numărul total de ore. Dacă nu e specificat, estimează în funcție de durata evenimentului (ex: 5 zile * 4 ore/zi = 20).
  "responsabilities": string, // O listă de responsabilități extrase din text (ex: ["coordonarea activităților", "promovare", "gestionarea echipei"]). Dacă nu e clar, dedu din acțiuni menționate.
  "skills": string // O listă de competențe dezvoltate sau demonstrate (ex: ["leadership", "comunicare", "lucru în echipă"]). Dacă nu sunt menționate explicit, dedu-le din context.
}

IMPORTANT: Returnează DOAR JSON-ul, fără text suplimentar înainte sau după.`

    const extractionCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: extractionPrompt }],
      model: "gpt-4",
      temperature: 0.2,
      max_tokens: 1000,
    })

    const response = extractionCompletion.choices[0]?.message?.content || "{}"

    const cleanResponse = response.replace(/```json\s*|\s*```/g, "").trim()
    const extractedData = JSON.parse(cleanResponse)

    return {
      ...extractedData,
      extractText: correctedText,
      userUuid: sessionStorage.getItem("userUuid") || "",
    }
  } catch (error) {
    console.error("Error processing document data:", error)
    return {
      extractText: extractedText,
      userUuid: sessionStorage.getItem("userUuid") || "",
    }
  }
}
