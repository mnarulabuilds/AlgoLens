import React, { useCallback, useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai"
import { BsArrowDown, BsArrowUp } from "react-icons/bs"
import "./Table.css"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function EnhancedTableHead(props) {
  const {
    numSelected,
    order,
    orderBy,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    headCells,
  } = props

  const createSortHandler = (property) => () => {
    onRequestSort(property)
  }

  return (
    <thead className="table-head">
      <tr>
        <th className="table-checkbox">
          <input
            type="checkbox"
            className="form-check-input"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            aria-label="select all entries"
          />
        </th>
        {headCells.map((headCell) => (
          <th
            key={headCell.id}
            className={headCell.numeric ? "text-end" : "text-start"}
            onClick={createSortHandler(headCell.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center">
              {headCell.label}
              {orderBy === headCell.id && (
                <span className="ms-2">
                  {order === "desc" ? <BsArrowDown /> : <BsArrowUp />}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
}

const EnhancedTableToolbar = ({
  numSelected,
  title,
  setSelected,
  deleteHandler,
  selected,
  searchState,
  setSearchState,
  performSearch,
  headCells,
}) => {
  const searchText = searchState?.searchText || ""
  const selectedIds = searchState?.searchIds || new Set()

  return (
    <div className={`table-toolbar ${numSelected > 0 ? "highlight" : ""}`}>
      {numSelected > 0 ? (
        <div className="d-flex justify-content-between align-items-center w-100">
          <h6 className="mb-0">{numSelected} selected</h6>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              deleteHandler(selected)
              setSelected([])
            }}
            title="Delete"
          >
            <AiOutlineDelete />
          </button>
        </div>
      ) : (
        <>
          <div className="search-field">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search In Table"
                value={searchText}
                onChange={(e) => {
                  setSearchState({
                    searchText: e.target.value || "",
                    searchIds: selectedIds,
                  })
                }}
                autoComplete="off"
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => performSearch(searchState)}
                disabled={!searchText}
                title="Filter table"
              >
                {searchText ? <AiOutlineSearch /> : <AiOutlineClose />}
              </button>
            </div>
          </div>
          {searchText && (
            <div className="search-columns">
              {headCells.map((cell) => {
                const { id, label } = cell
                return (
                  <div key={id} className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`checkbox-${id}`}
                      checked={selectedIds.has(id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          selectedIds.add(id)
                        } else if (selectedIds.size > 1) {
                          selectedIds.delete(id)
                        }
                        setSearchState({
                          searchText: searchText,
                          searchIds: selectedIds,
                        })
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`checkbox-${id}`}
                    >
                      {label}
                    </label>
                  </div>
                )
              })}
            </div>
          )}
          <h5 className="table-title">{title}</h5>
        </>
      )}
    </div>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  searchState: PropTypes.object.isRequired,
  performSearch: PropTypes.func.isRequired,
  setSearchState: PropTypes.func.isRequired,
}

export default function EnhancedTable({
  allRows,
  rows,
  headCells,
  deleteHandler,
  title,
  setFilteredRows,
}) {
  const primaryCellKey =
    (headCells &&
      Array.isArray(headCells) &&
      headCells.length > 0 &&
      headCells[0].id) ||
    ""
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState(primaryCellKey)
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchState, setSearchState] = useState({
    searchText: "",
    searchIds: new Set([primaryCellKey]),
  })

  const handlePerformSearch = useCallback(() => {
    const { searchText, searchIds } = searchState
    const temp = allRows.filter((row) => {
      let res = false
      for (let id of searchIds) {
        if (!res) {
          res = row[id].includes(searchText)
        }
      }
      return res
    })
    setFilteredRows(temp)
    setPage(0)
  }, [searchState, setFilteredRows, allRows])

  useEffect(() => {
    handlePerformSearch()
  }, [handlePerformSearch])

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n[primaryCellKey])
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows = rows.length === 0

  const displayedRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <div className="enhanced-table-root">
      <div className="card">
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          selected={selected}
          searchState={searchState}
          headCells={headCells}
          performSearch={() => handlePerformSearch()}
          deleteHandler={deleteHandler}
          setSelected={setSelected}
          setSearchState={setSearchState}
        />
        <div className="table-responsive">
          <table className="table table-hover">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <tbody>
              {displayedRows.map((row, index) => {
                const isItemSelected = isSelected(row[primaryCellKey])
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <tr
                    key={row[primaryCellKey]}
                    onClick={() => handleClick(row[primaryCellKey])}
                    className={isItemSelected ? "table-active" : ""}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="table-checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isItemSelected}
                        onChange={() => {}}
                        aria-labelledby={labelId}
                      />
                    </td>
                    {headCells.map((cell, idx) => (
                      <td
                        key={cell.id}
                        className={idx === 0 ? "fw-bold" : ""}
                        id={idx === 0 ? labelId : undefined}
                      >
                        {row[cell.id]}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
          {emptyRows && (
            <div className="table-note">
              {searchState.searchText
                ? `No search results found :( `
                : `No data found. Please add some entries using + button`}
            </div>
          )}
        </div>
        <div className="table-pagination">
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="densePadding"
                checked={dense}
                onChange={(e) => setDense(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="densePadding">
                Dense padding
              </label>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div>
                <label htmlFor="rowsPerPage" className="me-2">
                  Rows per page:
                </label>
                <select
                  id="rowsPerPage"
                  className="form-select form-select-sm d-inline-block w-auto"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10))
                    setPage(0)
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>
              <div>
                {page * rowsPerPage + 1}-
                {Math.min((page + 1) * rowsPerPage, rows.length)} of{" "}
                {rows.length}
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() =>
                    setPage(
                      Math.min(
                        Math.ceil(rows.length / rowsPerPage) - 1,
                        page + 1
                      )
                    )
                  }
                  disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
