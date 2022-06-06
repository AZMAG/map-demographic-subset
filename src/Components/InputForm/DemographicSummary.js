import { DataGrid } from "@mui/x-data-grid"

const columns = [
  { field: "id", headerName: "Demographic Group", width: 220, editable: false },
  {
    field: "pop",
    headerName: "Population",
    width: 90,
    valueGetter: (params) => params.row.pop.toLocaleString() || "",
    editable: false,
  },
  {
    field: "pct",
    headerName: "Percentage",
    width: 100,
    valueGetter: (params) => `${Math.round(params.row.pct * 10) / 10 || ""}%`,
    editable: false,
  },
]

export default function DemographicSummary({ rows }) {
  return (
    <>
      <p style={{ fontStyle: "italic" }}>
        You can use these percentages to estimate demographic information for the application
        process.
      </p>
      <div style={{ width: "100%", marginBottom: "10px" }}>
        <DataGrid
          disableColumnMenu
          disableColumnSelector
          autoHeight
          hideFooter
          disableEditing
          density="compact"
          rows={rows}
          columns={columns}
        />
      </div>
      <small style={{ fontStyle: "italic", fontSize: "12px", marginTop: "10px" }}>
        <b>Data Source:</b>
        <br /> American Community Survey by Block Group, 2016-2020 5 year estimates
      </small>
    </>
  )
}
