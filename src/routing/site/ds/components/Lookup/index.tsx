import React, { lazy, useState } from "react"
import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import { DynamicLoader } from "routing/base/Router"
import { Alert } from "reactstrap"

const Table = lazy(() => import(`common/components/Table`))

export default function Demo() {
  const [formKey, setFormKey] = useState("")
  const helperTextFormKey = formKey.length === 0 ? "Required" : ""
  const [formValue, setFormValue] = useState("")
  const helperTextFormValue = formValue.length === 0 ? "Required" : ""
  const [rows, setRows] = useState([])
  const [filteredRows, setFilteredRows] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  })

  const createData = (key, value) => {
    return { key, value }
  }

  const headCells = [
    {
      id: "key",
      numeric: false,
      disablePadding: true,
      label: "Lookup Key",
    },
    {
      id: "value",
      numeric: false,
      disablePadding: false,
      label: "Lookup Value",
    },
  ]

  const handleCloseSnackBar = () => {
    setSnackBar({
      open: false,
      message: "",
    })
  }

  const handleDelete = (numSelected) => {
    let tempArr = [...rows]
    if (numSelected.length > 0) {
      tempArr = tempArr.filter((ele) => {
        return !numSelected.includes(ele.key)
      })
      setRows(tempArr)
    }
  }

  const handleAddLookup = () => {
    const temp = [...rows]
    const entry = temp.find((e) => {
      return e.key === formKey.trim()
    })
    if (entry) {
      entry.value = formValue.trim()
      setSnackBar({
        open: true,
        message: `Entry has been Updated`,
      })
    } else {
      temp.push(createData(formKey.trim(), formValue.trim()))
      setSnackBar({
        open: true,
        message: `Entry has been created`,
      })
    }
    setRows(temp)
    setTimeout(() => handleCloseSnackBar(), 2000)
  }

  return (
    <div style={{ textAlign: "center" }}>
      {showForm ? (
        <form className="lookup-form" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="lookup-key-field">Key *</label>
              <input
                type="text"
                className={`form-control ${
                  helperTextFormKey ? "is-invalid" : ""
                }`}
                id="lookup-key-field"
                placeholder="Enter Lookup key"
                value={formKey}
                onChange={({ target: { value } }) => setFormKey(value)}
                required
              />
              {helperTextFormKey && (
                <div className="invalid-feedback">{helperTextFormKey}</div>
              )}
            </div>
            <div className="form-group mt-3">
              <label htmlFor="lookup-value-field">Value *</label>
              <input
                type="text"
                className={`form-control ${
                  helperTextFormValue ? "is-invalid" : ""
                }`}
                id="lookup-value-field"
                placeholder="Enter Lookup Value"
                value={formValue}
                onChange={({ target: { value } }) => setFormValue(value)}
                required
              />
              {helperTextFormValue && (
                <div className="invalid-feedback">{helperTextFormValue}</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center gap-2">
            <button
              type="button"
              className="btn btn-success"
              disabled={!!(helperTextFormKey || helperTextFormValue)}
              onClick={() => {
                handleAddLookup()
                setShowForm(false)
              }}
            >
              <AiOutlineCheck />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false)
                setFormKey("")
                setFormValue("")
              }}
            >
              <AiOutlineClose />
            </button>
          </div>
        </form>
      ) : (
        <button
          className="btn btn-secondary rounded-circle"
          style={{ width: "56px", height: "56px" }}
          onClick={() => setShowForm(true)}
        >
          <AiOutlinePlus size={24} />
        </button>
      )}

      {snackBar?.open && (
        <Alert
          color="success"
          isOpen={snackBar.open}
          toggle={handleCloseSnackBar}
          className="mt-3"
        >
          {snackBar.message}
        </Alert>
      )}

      {DynamicLoader(Table, {
        allRows: rows,
        rows: filteredRows,
        setFilteredRows: setFilteredRows,
        headCells: headCells,
        deleteHandler: handleDelete,
        title: "Lookup Mapping",
      })}
    </div>
  )
}
