import { CreateVolunteerDocumentInput } from "../../../api/volunteer-doc/usePostDoc"
import { openai } from "../../../config/openai.config"

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
2. TOATE câmpurile trebuie completate - NU sunt permise valori null, undefined sau câmpuri goale
3. Pentru câmpurile care nu sunt menționate explicit, fă estimări inteligente bazate pe context
4. Pentru date, folosește formatul dd.mm.yyyy
5. Pentru liste (responsibilities, skills), returnează array-uri JSON valide cu cel puțin un element
6. Pentru ore, returnează un număr întreg pozitiv
7. Dacă nu găsești informații directe, dedu din context și folosește valori plauzibile

CERINȚE OBLIGATORII:
- volunteerName: Dacă nu e specificat, dedu din context (ex: "Ion Popescu")
- eventName: Dacă nu e specificat, dedu din titlu, locație, tipul activității (ex: "Activitate Voluntariat", "Proiect Educațional", "Eveniment Comunitar")
- organization: Dacă nu e menționată, folosește "Organizație Locală" sau "Comunitate"
- dateFrom: Dacă e menționată doar o lună/an, folosește prima zi a lunii (ex: "01.06.2023")
- dateTo: Dacă e o singură zi, folosește aceeași dată ca dateFrom
- role: Dacă nu e specificat, folosește "voluntar" sau "participant"
- validation: "true" pentru activități formale, "false" pentru activități informale
- hours: Estimează în funcție de durata evenimentului (minim 4 oră, daca nu este specificat), daca is mai multe zile atunci formula (nr zile * 4 ore), daca e pe o perioada mai lunga de timp maximul de ore este 100(daca nu este specificat)
- responsabilities: Lista cu cel puțin o responsabilitate (ex: ["participare la activități"])
- skills: Lista cu cel puțin o competență (ex: ["lucru în echipă"])

Returnează STRICT un obiect JSON valid cu următoarea structură:

{
  "volunteerName": string, // Numele voluntarului. OBLIGATORIU - dedu din context dacă nu e specificat.
  "eventName": string, // Numele evenimentului sau activității. OBLIGATORIU - dedu din context dacă nu e specificat.
  "organization": string, // Numele organizației sau instituției. OBLIGATORIU - folosește "Organizație Locală" dacă nu e menționată.
  "dateFrom": string, // Data de început a activității, format: dd.mm.yyyy. OBLIGATORIU - estimează dacă nu e specificată.
  "dateTo": string, // Data de încheiere, format: dd.mm.yyyy. OBLIGATORIU - folosește aceeași dată dacă e o singură zi.
  "role": string, // Rolul voluntarului. OBLIGATORIU - folosește "voluntar" dacă nu e specificat.
  "validation": string, // "true" sau "false". OBLIGATORIU - estimează în funcție de context.
  "hours": number, // Numărul total de ore. OBLIGATORIU - estimează minim 4 oră.
  "responsabilities": string, // Array de responsabilități. OBLIGATORIU - cel puțin un element.
  "skills": string // Array de competențe. OBLIGATORIU - cel puțin un element.
}

IMPORTANT: 
- NU sunt permise valori null, undefined sau câmpuri goale
- Toate câmpurile trebuie completate cu date plauzibile
- Returnează DOAR JSON-ul, fără text suplimentar înainte sau după.`

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
