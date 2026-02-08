import React, { useState } from "react"
import { motion } from "framer-motion"
import { FaBug, FaUpload, FaCheckCircle } from "react-icons/fa"

const BugReportForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you'd send this to a backend
    console.log("Bug Report Submitted:", { title, description, file })
    setSubmitted(true)
    if (onSubmit) {
      setTimeout(() => {
        onSubmit({ title, description, file })
      }, 2000)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-5"
      >
        <FaCheckCircle size={60} color="#0d681c" className="mb-3" />
        <h3 className="text-success">Bug Reported Successfully!</h3>
        <p className="text-muted">Thank you for helping us improve AlgoLens.</p>
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
        />
      </div>

      <div className="mb-3">
        <label htmlFor="bug-desc" className="form-label fw-bold small">
          Description
        </label>
        <textarea
          id="bug-desc"
          className="form-control"
          rows="4"
          placeholder="Explain the steps to reproduce the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold small">
          Attach Recording/Screenshot
        </label>
        <div className="file-upload-wrapper">
          <input
            type="file"
            id="bug-file"
            className="form-control d-none"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="bug-file" className="file-upload-label py-3">
            <FaUpload className="mb-2" />
            <span>{file ? file.name : "Click to upload a file"}</span>
          </label>
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end border-top pt-3">
        <button type="button" className="btn btn-light" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary px-4"
          style={{ backgroundColor: "#162788", borderColor: "#162788" }}
        >
          Submit Report
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
