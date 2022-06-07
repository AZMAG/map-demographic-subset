import { useState } from "react"
import { DataGrid } from "@mui/x-data-grid"

import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import BlockGroupsTable from "./BlockGroupsTable"

const columns = [
  { field: "id", headerName: "Field", width: 210, editable: false },
  {
    field: "pop",
    headerName: "BG Overlap",
    description:
      "Summary of the block groups intersecting the drawn area, multiplied by the percentage of overlap between the drawn area and the block group.",
    width: 100,
    valueGetter: (params) => params.row.pop.toLocaleString() || "",
    editable: false,
  },
  {
    field: "popAll",
    headerName: "Full BG",
    width: 100,
    description:
      "Summary of the block groups intersecting the drawn area. The full block group values of are included in this total.",
    valueGetter: (params) => params.row.popAll.toLocaleString() || "",
    editable: false,
  },
]

export default function DemographicSummary({ data }) {
  const [tabValue, setTabValue] = useState("1")
  function handleChange(event, newValue) {
    setTabValue(newValue)
  }
  return (
    <>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Summary" value="1" />
            <Tab label="Block Groups" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0, mt: 1 }} value="1">
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <DataGrid
              disableColumnMenu
              disableColumnSelector
              autoHeight
              hideFooter
              disableEditing
              density="compact"
              rows={data.summary}
              columns={columns}
            />
          </div>
        </TabPanel>
        <TabPanel sx={{ padding: 0, mt: 1 }} value="2">
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <BlockGroupsTable
              ogBg={data.bgData[0]}
              intersectBg={data.bgData[1]}
              intersectArea={data.bgData[2]}
            />
          </div>
        </TabPanel>
      </TabContext>
      {/* <p style={{ fontStyle: "italic" }}>
        You can use these percentages to estimate demographic information for the application
        process.
      </p> */}

      <small style={{ fontStyle: "italic", fontSize: "12px", marginTop: "10px" }}>
        <b>Data Source:</b>
        <br /> American Community Survey by Block Group, 2016-2020 5 year estimates
      </small>
    </>
  )
}
