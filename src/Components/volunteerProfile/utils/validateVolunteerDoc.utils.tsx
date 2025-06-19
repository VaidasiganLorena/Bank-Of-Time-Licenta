import { openai } from "../../../config/openai.config"

// Funcție pentru corectarea textului extras din OCR
const correctExtractedText = async (extractedText: string): Promise<string> => {
  try {
    const correctionPrompt = `Corectează următorul text extras din OCR, adăugând diacriticele românești lipsă și corectând erorile de recunoaștere a caracterelor.

TEXT ORIGINAL:
${extractedText}

INSTRUCȚIUNI:
1. Adaugă diacriticele românești lipsă (ă, â, î, ș, ț)
2. Corectează erorile comune de OCR (ex: "0" în loc de "o", "1" în loc de "l", etc.)
3. Păstrează structura originală a documentului
4. Nu schimba numele proprii, datele sau numerele
5. Corectează doar erorile evidente de recunoaștere

Returnează textul corectat, fără explicații suplimentare.`

    const correctionCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: correctionPrompt }],
      model: "gpt-4",
      temperature: 0.1,
      max_tokens: 1000,
    })

    const correctedText =
      correctionCompletion.choices[0]?.message?.content?.trim()

    console.log("=== CORECTARE TEXT ===")
    console.log("Text original:", extractedText.substring(0, 200) + "...")
    console.log("Text corectat:", correctedText?.substring(0, 200) + "...")

    return correctedText || extractedText
  } catch (error) {
    console.error("Error correcting text:", error)
    return extractedText // Returnează textul original dacă corectarea eșuează
  }
}

export const validateVolunteerDocument = async (
  extractedText: string
): Promise<{ isValid: boolean; reason?: string; correctedText?: string }> => {
  try {
    // Pasul 1: Corectează textul extras
    const correctedText = await correctExtractedText(extractedText)

    // Pasul 2: Validează textul corectat
    const validationPrompt = `Analizează următorul text extras dintr-un document și determină dacă reprezintă o adeverință, certificat sau diplomă validă de voluntariat.

TEXT EXTRAS:
${correctedText}

INSTRUCȚIUNI:
1. Verifică dacă textul conține elemente specifice activităților de voluntariat
2. Caută mențiuni despre: voluntariat, activități sociale, ONG, fundații, asociații, ore de voluntariat, certificare, adeverință, diploma, certificat
3. Verifică dacă pare să fie un document oficial (diplomă, certificat, adeverință, etc.)
4. Exclude documente care nu sunt legate de voluntariat (facturi, contracte, etc.)

TIPURI DE DOCUMENTE ACCEPTATE:
- Adevărințe de voluntariat
- Certificate de voluntariat  
- Diplome de voluntariat
- Documente de certificare pentru activități de voluntariat
- Adevărințe de participare la proiecte sociale
- Certificates emise de ONG-uri, fundații, asociații

Returnează DOAR "true" dacă este un document valid de voluntariat, sau "false" în caz contrar.
Nu adăuga text suplimentar, doar true sau false.`

    const validationCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: validationPrompt }],
      model: "gpt-4",
      temperature: 0.1,
      max_tokens: 50,
    })

    const response = validationCompletion.choices[0]?.message?.content
      ?.trim()
      .toLowerCase()

    // Log pentru debugging
    console.log("AI Response:", response)

    // Validare mai robustă a răspunsului
    const isValid =
      response === "true" || response === "true." || response === "true,"

    return {
      isValid,
      reason: isValid
        ? undefined
        : `Document respins. Răspuns AI: "${response}"`,
      correctedText,
    }
  } catch (error) {
    console.error("Error validating volunteer document:", error)
    return {
      isValid: false,
      reason: "Eroare la validarea documentului",
    }
  }
}

// Funcție de test pentru debugging
export const testVolunteerDocumentValidation = async () => {
  const testDocuments = [
    {
      name: "Adevărință voluntariat ONG - cu probleme OCR",
      text: `ADEVARINTA DE VOLUNTARIAT
      
      Se adevereste ca domnul/doamna [NUME] a participat ca voluntar in cadrul organizatiei noastre in perioada [DATA] - [DATA], acumuland un total de 50 de ore de voluntariat in cadrul proiectului "Ajutor pentru comunitate".

      Organizatia: Asociatia pentru Dezvoltarea Comunitatii
      Data: 15.12.2023
      Semnatura: [SEMNATURA]`,
    },
    {
      name: "Certificat participare proiect social - cu probleme OCR",
      text: `CERTIFICAT DE PARTICIPARE
      
      Acest certificat atesta participarea domnului/doamei [NUME] la proiectul social "EduCare" organizat de Fundatia pentru Educatie, in perioada 1-30 iunie 2023.

      Tipul activitatii: Voluntariat educational
      Ore acumulate: 40 ore
      Fundatia pentru Educatie`,
    },
    {
      name: "Document cu erori OCR severe",
      text: `ADEVARINTA DE V0LUNTARIAT
      
      Se adevereste ca d0mnul/d0amna [NUME] a participat ca v0luntar in cadrul 0rganizatiei n0astre in perioada [DATA] - [DATA], acumuland un t0tal de 50 de 0re de v0luntariat in cadrul pr0iectului "Ajut0r pentru c0munitate".

      0rganizatia: As0ciatia pentru Dezv0ltarea C0munitatii
      Data: 15.12.2023
      Semnatura: [SEMNATURA]`,
    },
    {
      name: "Document invalid - factură",
      text: `FACTURĂ
      
      Client: [NUME]
      Servicii: Consultanță
      Suma: 500 RON
      Data: 15.12.2023`,
    },
  ]

  console.log("=== TESTARE VALIDARE DOCUMENTE ===")

  for (const doc of testDocuments) {
    console.log(`\n--- Testare: ${doc.name} ---`)
    const result = await validateVolunteerDocument(doc.text)
    console.log(`Rezultat: ${result.isValid ? "VALID" : "INVALID"}`)
    if (result.reason) {
      console.log(`Motiv: ${result.reason}`)
    }
    if (result.correctedText) {
      console.log(`Text corectat: ${result.correctedText.substring(0, 150)}...`)
    }
  }
}
