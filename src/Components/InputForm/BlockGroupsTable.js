import React from "react"

import { DataGrid } from "@mui/x-data-grid"
import { useDataStore } from "../../Stores/DataContext"
import { observer } from "mobx-react-lite"

function BlockGroupsTable({ ogBg, intersectBg, intersectArea }) {
  const store = useDataStore()
  const columns = [
    {
      field: "originalArea",
      headerName: "BG Area (SQMI)",
      width: 150,
      valueGetter: (params) => Math.round(params.row.originalArea * 1000) / 1000,
      editable: false,
    },
    {
      field: "intersectArea",
      headerName: "Intersect (SQMI)",
      valueGetter: (params) => Math.round(params.row.intersectArea * 1000) / 1000,
      width: 130,
      editable: false,
    },
    {
      field: "pctIntersect",
      headerName: "%",
      width: 60,
      valueGetter: (params) => Math.floor(params.row.pctIntersect.toFixed(2) * 100) + "%",
      editable: false,
    },
  ]

  const rows = []

  for (let i = 0; i < ogBg.length; i++) {
    rows.push({
      oid: ogBg[i].attributes.OBJECTID,
      id: i,
      originalArea: ogBg[i].attributes.SQMI,
      intersectArea: intersectArea[i],
      pctIntersect: intersectArea[i] / ogBg[i].attributes.SQMI,
    })
  }

  let highlight = null
  function rowMouseEnter(e) {
    const row = rows[e.currentTarget.dataset.id]
    const oid = row.oid

    if (highlight) {
      highlight.remove()
    }

    if (store.bgLayerView) {
      highlight = store.bgLayerView.highlight(oid)
    }
  }
  function rowMouseLeave(event) {
    if (highlight) {
      highlight.remove()
    }
  }

  return (
    <div>
      <small>
        Intersecting Block Groups: <b>{rows.length}</b>
      </small>
      <br />
      <hr />
      <small style={{ fontStyle: "italic" }}>
        Hover over a row in the table to highlight the block group on the map
      </small>
      <DataGrid
        disableColumnMenu
        disableColumnSelector
        hideFooter
        disableEditing
        density="compact"
        sx={{ height: "300px" }}
        rows={rows}
        columns={columns}
        componentsProps={{
          row: {
            onMouseEnter: rowMouseEnter,
            onMouseLeave: rowMouseLeave,
          },
        }}
      />
    </div>
  )
}
export default observer(BlockGroupsTable)
