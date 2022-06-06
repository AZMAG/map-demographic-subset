import React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import { useDataStore } from "../../Stores/DataContext"
import { observer } from "mobx-react-lite"

function SubmitForm({ handleBack, handleNext }) {
  const store = useDataStore()
  return (
    <>
      <div style={{ margin: "auto", width: "90%" }}>
        <br />
        <h6>Are you sure you want to submit?</h6>
        <hr />
        <span>
          <b>Organization Name:</b>
          <span style={{ marginLeft: "10px" }}>{store.orgName}</span>
        </span>
        <br />
        <span>
          <b>Contact Name:</b>
          <span style={{ marginLeft: "10px" }}>{store.contactName}</span>
        </span>
        <br />
        <span>
          <b>Contact Email:</b>
          <span style={{ marginLeft: "10px" }}>{store.contactEmail}</span>
        </span>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button variant="outlined" color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button variant="outlined" onClick={handleNext}>
          Submit
        </Button>
      </Box>
    </>
  )
}
export default observer(SubmitForm)
