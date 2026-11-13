import { ReactNode } from "react"
import { Grid, CellComponentProps } from "react-window"

type CellProps = {
  renderItem: (index: number) => ReactNode
}

type HorizontalVirtualListProps = {
  height: number
  itemCount: number
  itemSize: number
  renderItem: (index: number) => ReactNode
  width: number
}

const GridCell = ({
  ariaAttributes,
  columnIndex,
  renderItem,
  style,
}: CellComponentProps<CellProps>) => (
  <div {...ariaAttributes} style={style}>
    {renderItem(columnIndex)}
  </div>
)

const HorizontalVirtualList = ({
  height,
  itemCount,
  itemSize,
  renderItem,
  width,
}: HorizontalVirtualListProps) => (
  <Grid
    cellComponent={GridCell}
    cellProps={{ renderItem }}
    columnCount={itemCount}
    columnWidth={itemSize}
    defaultHeight={height}
    defaultWidth={width}
    rowCount={1}
    rowHeight={height}
    style={{ height, width }}
  />
)

export default HorizontalVirtualList
