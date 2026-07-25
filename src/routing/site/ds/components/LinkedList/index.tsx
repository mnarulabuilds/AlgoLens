import React, { useState, Fragment } from "react"
import Element from "common/components/Element"
import Insert from "./Insert"
import Delete from "./Delete"
import Update from "./Update"
import Search from "./Search"
import "./LinkedList.css"

export default function LinkedList() {
  const [head, setHead] = useState(null)
  const [list, setList] = useState(null)
  const [rendered, setRendered] = useState(false)
  const [radioVal, setRadioVal] = useState(false)

  const showOperation = (event) => {
    const operation = event.target.value
    setRadioVal(operation)
  }

  // clear function --------------------------------------------
  const clear = () => {
    let curr = head
    while (curr) {
      curr.highlight = false
      curr = curr.next
    }
    setHead(head)
  }
  // insert--------------------------------------------------------
  const insert = (data, where) => {
    if (data) {
      clear()
      const newNode = { info: data, next: null, highlight: false }
      let curr
      if (!head) {
        setHead({ ...newNode })
      } else {
        switch (where.toLowerCase()) {
          case "start":
            newNode.next = head
            setHead({ ...newNode })
            break
          case "end":
          default:
            curr = head
            while (curr.next) {
              curr = curr.next
            }
            curr.next = newNode
            setHead({ ...head })
        }
      }
      setRendered(false)
    } else {
      alert("Empty Insert")
    }
  }
  //----------Using 'del' instead of delete is some keyword
  const del = (data, where, position) => {
    if (head) {
      clear()
      if (data) {
        let head1 = head,
          curr = head1
        while (head1 && head1.info === data) {
          head1 = head1.next
          curr = head1
        }
        while (curr && curr.next) {
          if (curr.next.info === data) {
            curr.next = curr.next.next
          } else {
            curr = curr.next
          }
        }
        setHead(head1)
      } else if (position == parseInt(position)) {
        position = parseInt(position)
        let nextHead = head
        if (position === 0) {
          nextHead = head.next
        } else {
          let curr = head
          while (--position > 0 && curr) {
            curr = curr.next
          }
          if (curr && curr.next) {
            curr.next = curr.next.next
          } else {
            alert("No element to delete")
          }
        }
        setHead(nextHead)
      } else if (where) {
        let nextHead = head
        let curr = head
        switch (where) {
          case "start":
            nextHead = head.next
            break
          case "end":
            if (!head.next) {
              nextHead = null
            } else {
              while (curr && curr.next && curr.next.next) {
                curr = curr.next
              }
              if (curr && curr.next) {
                curr.next = curr.next.next
              }
            }
            break
          default:
        }
        setHead(nextHead)
      } else {
        alert("Invalid Deletion Exception")
      }
      setRendered(false)
    } else {
      alert("List is empty")
    }
  }
  //Update------------------------------------------------------
  const update = (position, value) => {
    if (position && value && parseInt(position) >= 0) {
      clear()
      const head1 = head
      let curr = head
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

  // Search----------------------------------------------------

  const search = (data) => {
    if (data) {
      clear()
      const head1 = head
      let curr = head
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

  const renderList = () => {
    const list = []
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

  //-----------------content of render function ------------------------------------
  React.useEffect(() => {
    if (!rendered) {
      renderList()
    }
  })

  return (
    <div className="linked-list-root">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="linked-list-paper">
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
                  del={(data, where, position) => {
                    del(data, where, position)
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
