import React, { useState, Fragment } from "react"
import Insert from "./Insert"
import Delete from "./Delete"
import Update from "./Update"
import Search from "./Search"
import Element from "common/components/Element"
import "./Queues.css"

export default function Queues() {
  let [head, setHead] = useState(null)
  let [list, setList] = useState(null)
  let [rendered, setRendered] = useState(false)
  let [radioVal, setRadioVal] = useState(false)

  let showOperation = (event) => {
    let operation = event.target.value
    setRadioVal(operation)
  }

  let clear = () => {
    let curr = head
    while (curr) {
      curr.highlight = false
      curr = curr.next
    }
    setHead(head)
  }

  let insert = (data) => {
    if (data) {
      clear()
      let newNode = { info: data, next: null, highlight: false },
        curr
      if (!head) {
        setHead({ ...newNode })
      } else {
        curr = head
        while (curr.next) {
          curr = curr.next
        }
        curr.next = newNode
        setHead({ ...head })
      }
      setRendered(false)
    } else {
      alert("Empty Insert")
    }
  }

  let del = () => {
    if (head) {
      clear()
      head = head.next
      setHead(head)
      setRendered(false)
    } else {
      alert("Queue is empty")
    }
  }

  let update = (position, value) => {
    if (position && value && parseInt(position) >= 0) {
      clear()
      let head1 = head,
        curr = head
      while (curr && --position >= 0) {
        curr = curr.next
      }
      if (curr) {
        curr.info = value
        curr.highlight = true
        setHead(head1)
        setRendered(false)
      } else {
        alert("Position out of bounds")
      }
    } else {
      alert("Cannot update")
    }
  }

  let search = (data) => {
    if (data) {
      clear()
      let head1 = head,
        curr = head
      while (curr) {
        if (curr.info === data) {
          curr.highlight = true
        }
        curr = curr.next
      }
      setHead(head1)
      setRendered(false)
    } else {
      alert("Empty Search")
    }
  }

  let renderList = () => {
    let list = []
    if (head) {
      let curr = head,
        key = 0
      while (curr) {
        list.push(
          <Fragment key={`${key}-${curr.info}`}>
            <Element
              data={{ value: curr.info, index: key }}
              type="LinkedList"
              next={!!curr.next}
              highlight={curr.highlight}
            />
          </Fragment>
        )
        curr = curr.next
        key++
      }
    }
    setList(list)
    setRendered(true)
  }

  React.useEffect(() => {
    if (!rendered) {
      renderList()
    }
  })

  return (
    <div className="queues-root">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="queues-paper">
              <div className="card">
                <h6 className="bg-primary text-center text-white p-3">
                  Operations
                </h6>
                <div className="card-body">
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="operation"
                        id="insertRadio"
                        value="Insert"
                        onChange={showOperation}
                      />
                      <label className="form-check-label" htmlFor="insertRadio">
                        Insert
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="operation"
                        id="deleteRadio"
                        value="Delete"
                        onChange={showOperation}
                      />
                      <label className="form-check-label" htmlFor="deleteRadio">
                        Delete
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="operation"
                        id="updateRadio"
                        value="Update"
                        onChange={showOperation}
                      />
                      <label className="form-check-label" htmlFor="updateRadio">
                        Update
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="operation"
                        id="searchRadio"
                        value="Search"
                        onChange={showOperation}
                      />
                      <label className="form-check-label" htmlFor="searchRadio">
                        Search
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Insert
                  open={radioVal === "Insert"}
                  insert={(data, where) => {
                    insert(data, where)
                  }}
                />
                <Search
                  open={radioVal === "Search"}
                  search={(data) => {
                    search(data)
                  }}
                />
                <Delete
                  open={radioVal === "Delete"}
                  del={(where) => {
                    del(where)
                  }}
                />
                <Update
                  open={radioVal === "Update"}
                  update={(position, value) => {
                    update(position, value)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12">{list}</div>
        </div>
      </div>
    </div>
  )
}
