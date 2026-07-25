import React, { useState, FormEvent, ChangeEvent } from "react"
import { motion } from "framer-motion"
import { FaBug, FaUpload, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"
import {
  sendBugReportEmail,
  isBugReportConfigured,
  BugReportPayload,
} from "common/helpers/sendBugReport"

export type { BugReportPayload }

type BugReportFormProps = {
  onSubmit?: (payload: BugReportPayload) => void
  onCancel?: () => void
}

const BugReportForm = ({ onSubmit, onCancel }: BugReportFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [reporterEmail, setReporterEmail] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  )
  const [errorMessage, setErrorMessage] = useState("")

  const configured = isBugReportConfigured()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!configured || status === "sending") return

    setStatus("sending")
    setErrorMessage("")

    const payload: BugReportPayload = {
      title: title.trim(),
      description: description.trim(),
      file,
      reporterEmail: reporterEmail.trim() || undefined,
    }

    try {
      await sendBugReportEmail(payload)
      setStatus("success")
      onSubmit?.(payload)
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      )
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-5"
      >
        <FaCheckCircle size={60} color="#0d681c" className="mb-3" />
        <h3 className="text-success">Bug Reported Successfully!</h3>
        <p className="text-muted">
          Thanks — your report was emailed to the AlgoLens inbox.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bug-report-form p-2">
      <div className="mb-4 text-center">
        <div className="bug-icon-wrapper mb-2">
          <FaBug size={30} color="#162788" />
        </div>
        <p className="text-muted small">
          Please provide as much detail as possible to help us squash this bug.
        </p>
      </div>

      {!configured && (
        <div className="alert alert-warning small py-2" role="alert">
          Bug reporting is not configured yet. Add{" "}
          <code>VITE_WEB3FORMS_ACCESS_KEY</code> to your <code>.env</code> file
          (see <code>.env.example</code>).
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="bug-title" className="form-label fw-bold small">
          Bug Title
        </label>
        <input
          type="text"
          id="bug-title"
          className="form-control"
          placeholder="What's going wrong?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={status === "sending"}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="bug-desc" className="form-label fw-bold small">
          Description
        </label>
        <textarea
          id="bug-desc"
          className="form-control"
          rows={4}
          placeholder="Explain the steps to reproduce the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={status === "sending"}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="bug-email" className="form-label fw-bold small">
          Your email <span className="text-muted fw-normal">(optional)</span>
        </label>
        <input
          type="email"
          id="bug-email"
          className="form-control"
          placeholder="So we can follow up if needed"
          value={reporterEmail}
          onChange={(e) => setReporterEmail(e.target.value)}
          disabled={status === "sending"}
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold small">
          Attach Recording/Screenshot{" "}
          <span className="text-muted fw-normal">
            (optional — filename is emailed)
          </span>
        </label>
        <div className="file-upload-wrapper">
          <input
            type="file"
            id="bug-file"
            className="form-control d-none"
            accept="image/*,video/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files?.[0] ?? null)
            }
            disabled={status === "sending"}
          />
          <label htmlFor="bug-file" className="file-upload-label py-3">
            <FaUpload className="mb-2" />
            <span>{file ? file.name : "Click to upload a file"}</span>
          </label>
        </div>
      </div>

      {status === "error" && (
        <div
          className="alert alert-danger small d-flex align-items-start gap-2 py-2"
          role="alert"
        >
          <FaExclamationTriangle className="mt-1 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="d-flex gap-2 justify-content-end border-top pt-3">
        <button
          type="button"
          className="btn btn-light"
          onClick={onCancel}
          disabled={status === "sending"}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary px-4"
          style={{ backgroundColor: "#162788", borderColor: "#162788" }}
          disabled={!configured || status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Submit Report"}
        </button>
      </div>

      <style>{`
        .bug-icon-wrapper {
          width: 60px;
          height: 60px;
          background: #f0f4ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        .file-upload-label {
          border: 2px dashed #e2e8f0;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
        }
        .file-upload-label:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .form-control:focus {
          border-color: #162788;
          box-shadow: 0 0 0 0.25rem rgba(22, 39, 136, 0.1);
        }
      `}</style>
    </form>
  )
}

export default BugReportForm
