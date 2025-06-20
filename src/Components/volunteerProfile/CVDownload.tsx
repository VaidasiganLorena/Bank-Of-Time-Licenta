import { Button } from "@mantine/core"
import { IconDownload } from "@tabler/icons-react"
import { FC } from "react"
import moment from "moment"
import { CVData } from "../../api/cv/useUpdateCV"
import { setMessageNotification } from "../../Redux/notification/slice"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface CVDownloadProps {
  generatedCV: CVData | null
  userData: any
  activitiesData?: any
  photo?: string
}

export const CVDownload: FC<CVDownloadProps> = ({
  generatedCV,
  userData,
  activitiesData,
  photo,
}) => {
  const downloadCV = async () => {
    if (!generatedCV) return

    const { name, email, phone, city } = userData?.data?.response?.[0] || {}

    const htmlContent = `
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV Voluntar - ${name}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            margin: 0;
            padding: 20px;
        }
        .cv-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
        }
        .header-section {
            margin-bottom: 2rem;
        }
        .header-content {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
        }
        .profile-photo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #e6e8ea;
        }
        .profile-info {
            flex: 1;
        }
        .name {
            font-size: 2em;
            font-weight: bold;
            color: black;
            margin: 0 0 5px 0;
        }
        .title {
            font-size: 1rem;
            color: #666;
            margin: 0 0 1rem 0;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
        }
        .contact-icon {
            color: #28886f;
            font-weight: bold;
        }
        .section {
            margin-bottom: 2rem;
        }
        .section-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: #2c3e50;
            border-bottom: 2px solid #e6e8ea;
            padding-bottom: 5px;
            margin-bottom: 1rem;
        }
        .summary-text {
            font-size: 1rem;
            line-height: 1.6;
        }
        .experience-item {
            margin-bottom: 2rem;
            padding-left: 1rem;
        }
        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        .organization {
            font-size: 1.1rem;
            font-weight: bold;
            color: #2c3e50;
        }
        .hours-badge {
            background: transparent;
            color: #28886f;
            border: 1px solid #28886f;
            border-radius: 2rem;
            text-transform: uppercase;
            font-weight: bold;
            height: 1.5rem;
            padding: 0 0.75rem;
            padding-top: 0.1rem;
            font-size: 0.6rem;
        }
        .role-period {
            font-size: 0.9rem;
            color: #666;
            font-style: italic;
            margin-bottom: 0.5rem;
        }
        .description {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 0.5rem;
        }
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .skill-badge {
            background: #28886f;
            height: 1.25rem;
            color: white;
            text-transform: uppercase;
            border-radius: 2rem;
            font-size: 0.7rem;
            padding: 0 0.75rem;
        }
        .competencies-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 10px;
        }
        .competency-badge {
            height: 1.25rem;
            background: transparent;
            color: #495057;
            text-transform: uppercase;
            border-radius: 2rem;
            text-align: center;
            font-weight: 700;
            font-size: 0.7rem;
            border: 0.0625rem solid #dee2e6;
        }
        .achievements-list {
            list-style: none;
            padding-left: 1rem;
        }
        .achievements-list li {
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 0.5rem;
            position: relative;
        }
        .achievements-list li:before {
            content: "•";
            color: #28886f;
            font-weight: bold;
            position: absolute;
            left: -1rem;
        }
        .activity-item {
            margin-bottom: 1rem;
            padding: 1rem;
            border-radius: 10px;
            border: 1px solid #e6e8ea;
        }
        .activity-content {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        .activity-photo {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            object-fit: cover;
        }
        .activity-info {
            flex: 1;
        }
        .activity-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        .activity-title {
            font-size: 1rem;
            font-weight: bold;
            color: #2c3e50;
        }
        .activity-hours {
            background: transparent;
            color: #28886f;
            border: 1px solid #28886f;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.8rem;
        }
        .activity-details {
            display: flex;
            gap: 1rem;
            font-size: 0.9rem;
            color: #666;
        }
        .activity-detail {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .footer {
            text-align: center;
            padding-top: 1rem;
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <!-- Header Section -->
        <div class="header-section">
            <div class="header-content">
                ${
                  photo
                    ? `<img src="${photo}" alt="Profile Photo" class="profile-photo">`
                    : ""
                }
                <div class="profile-info">
                    <h1 class="name">${name || "Nume Voluntar"}</h1>
                    <p class="title">Voluntar în Comunitate</p>
                    <div class="contact-grid">
                        <div class="contact-item">
                            <span class="contact-icon">📧</span>
                            <span>${email || ""}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📞</span>
                            <span>${phone || ""}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📍</span>
                            <span>${city || ""}</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">🏢</span>
                            <span>Total: ${
                              generatedCV.totalHours || 0
                            } ore voluntariat</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Summary Section -->
        <div class="section">
            <h2 class="section-title">SUMAR PROFESIONAL</h2>
            <p class="summary-text">${
              generatedCV.summary ||
              "Voluntar dedicat cu experiență în ajutarea comunității prin diverse activități de voluntariat."
            }</p>
        </div>

        <!-- Volunteer Experience Section -->
        <div class="section">
            <h2 class="section-title">EXPERIENȚĂ DE VOLUNTARIAT</h2>
            ${
              generatedCV.volunteerExperience
                ?.map(
                  (exp: any) => `
                <div class="experience-item">
                    <div class="experience-header">
                        <div class="organization">${exp.organization}</div>
                        <div class="hours-badge">${exp.hours} ore</div>
                    </div>
                    <div class="role-period">${exp.role} • ${exp.period}</div>
                    <p class="description">${exp.description}</p>
                    <div class="skills-container">
                        ${
                          exp.skills
                            ?.map(
                              (skill: string) =>
                                `<span class="skill-badge">${skill}</span>`
                            )
                            .join("") || ""
                        }
                    </div>
                </div>
            `
                )
                .join("") ||
              "<p>Nu există experiență de voluntariat înregistrată.</p>"
            }
        </div>

        <!-- Skills Section -->
        <div class="section">
            <h2 class="section-title">COMPETENȚE</h2>
            <div class="competencies-grid">
                ${
                  generatedCV.skills
                    ?.map(
                      (skill: string) =>
                        `<div class="competency-badge">${skill}</div>`
                    )
                    .join("") ||
                  "Competențe de voluntariat, lucru în echipă, comunicare, empatie"
                }
            </div>
        </div>

        <!-- Achievements Section -->
        <div class="section">
            <h2 class="section-title">REALIZĂRI</h2>
            <ul class="achievements-list">
                ${
                  generatedCV.achievements
                    ?.filter(
                      (achievement: string) =>
                        achievement && achievement.trim() !== ""
                    )
                    .map((achievement: string) => `<li>${achievement}</li>`)
                    .join("") || "<li>Nu există realizări înregistrate.</li>"
                }
            </ul>
        </div>

        <!-- Activities in Bank of Time Section -->
        ${
          activitiesData?.data?.response?.filter(
            (activity: any) => activity.status === "Finalizat"
          ).length > 0
            ? `
        <div class="section">
            <h2 class="section-title">ACTIVITĂȚI ÎN BANCA TIMPULUI</h2>
            ${activitiesData.data.response
              .filter((activity: any) => activity.status === "Finalizat")
              .map((activity: any, index: number) => {
                const helpType =
                  activity.helpTypeUuid === "1" ? "Companie" : "Cumpărături"
                const date = new Date(
                  activity.dateOfAppointment
                ).toLocaleDateString("ro-RO")
                return `
                    <div class="activity-item">
                        <div class="activity-content">
                            ${
                              activity.photoGainer
                                ? `<img src="${activity.photoGainer}" alt="Activity" class="activity-photo">`
                                : ""
                            }
                            <div class="activity-info">
                                <div class="activity-header">
                                    <div class="activity-title">${helpType} pentru ${
                  activity.nameGainer || "beneficiar"
                }</div>
                                    <div class="hours-badge">${
                                      activity.timeVolunteering || 0
                                    } ore</div>
                                </div>
                                <div class="activity-details">
                                    <div class="activity-detail">
                                        <span>📍</span>
                                        <span>${
                                          activity.cityGainer ||
                                          "Oraș necunoscut"
                                        }</span>
                                    </div>
                                    <div class="activity-detail">
                                        <span>🕒</span>
                                        <span>${date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
              })
              .join("")}
        </div>
        `
            : ""
        }

        <!-- Footer -->
        <div class="footer">
            <p>Generat automat de Banca Timpului - ${moment().format(
              "DD.MM.YYYY"
            )}</p>
        </div>
    </div>
</body>
</html>`

    try {
      // Create a temporary div to render the HTML
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = htmlContent
      tempDiv.style.position = "absolute"
      tempDiv.style.left = "-9999px"
      tempDiv.style.top = "0"
      document.body.appendChild(tempDiv)

      // Convert HTML to canvas
      const canvas = await html2canvas(
        tempDiv.querySelector(".cv-container") as HTMLElement,
        {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: 800,
          height: tempDiv.querySelector(".cv-container")?.scrollHeight || 1200,
        }
      )

      // Remove temporary div
      document.body.removeChild(tempDiv)

      // Create PDF
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")

      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Download the PDF
      pdf.save(`CV_Voluntar_${name?.replace(/\s+/g, "_") || "Voluntar"}.pdf`)

      setMessageNotification("CV-ul a fost descărcat ca PDF!")
    } catch (error) {
      console.error("Error generating PDF:", error)
      setMessageNotification("Eroare la generarea PDF-ului. Încearcă din nou.")
    }
  }

  return (
    <Button
      onClick={downloadCV}
      leftIcon={<IconDownload size={16} />}
      color="brand"
      variant="outline"
      radius="md"
    >
      Descarcă CV PDF
    </Button>
  )
}
