export type BugReportPayload = {
  title: string
  description: string
  file: File | null
  reporterEmail?: string
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

export function isBugReportConfigured(): boolean {
  return Boolean(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim())
}

export async function sendBugReportEmail(
  payload: BugReportPayload
): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  if (!accessKey) {
    throw new Error(
      "Bug reporting is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file."
    )
  }

  const body: Record<string, string> = {
    access_key: accessKey,
    subject: `[AlgoLens Bug] ${payload.title}`,
    from_name: "AlgoLens Bug Report",
    botcheck: "",
    bug_title: payload.title,
    description: payload.description,
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    submitted_at: new Date().toISOString(),
  }

  if (payload.reporterEmail?.trim()) {
    body.email = payload.reporterEmail.trim()
    body.replyto = payload.reporterEmail.trim()
  }

  if (payload.file) {
    body.attachment_name = payload.file.name
    body.attachment_type = payload.file.type || "unknown"
    body.attachment_size_kb = String(Math.round(payload.file.size / 1024))
    body.attachment_note =
      "A file was selected in the form; binary attachments require Web3Forms Pro. Filename and size are included above."
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })

  let data: { success?: boolean; message?: string } = {}
  try {
    data = await response.json()
  } catch {
    // non-JSON error body
  }

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message || "Failed to send bug report. Please try again."
    )
  }
}
