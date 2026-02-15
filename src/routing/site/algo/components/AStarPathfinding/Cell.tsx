import React from "react"
import styles from "./AStarPathfinding.module.css"

const Cell = ({
    row,
    col,
    type,
    isStart,
    isEnd,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
}) => {
    const getCellClass = () => {
        if (isStart) return styles.start
        if (isEnd) return styles.end

        switch (type) {
            case "wall":
                return styles.wall
            case "open":
                return styles.open
            case "closed":
                return styles.closed
            case "path":
                return styles.path
            default:
                return styles.empty
        }
    }

    return (
        <div
            className={`${styles.cell} ${getCellClass()}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={onMouseUp}
        />
    )
}

export default React.memo(Cell)
