import React, { useState, useCallback } from "react"
import Element from "common/components/Element"
import Insert from "./Insert"
import Delete from "./Delete"
import Update from "./Update"
import Search from "./Search"

const Array = () => {
  const [state, setState] = useState({
    array: [],
    highlights: [],
  })

  const updateState = useCallback((newState) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mt-2">
          <Insert array={state.array} updateState={updateState} alertId={1} />
        </div>
        <div className="col-12 mt-2">
          <Delete array={state.array} updateState={updateState} alertId={2} />
        </div>
        <div className="col-12 mt-2">
          <Update array={state.array} updateState={updateState} alertId={3} />
        </div>
        <div className="col-12 mt-2">
          <Search array={state.array} updateState={updateState} alertId={4} />
        </div>
      </div>
      <div className="row mt-4 mb-4">
        {state.array.map((value, index) => {
          const highlight = state.highlights.includes(index)
          return (
            <div className="col-sm-3" key={`${value}-${index}`}>
              <Element
                highlight={highlight}
                data={{ value, index }}
                type="array"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Array
