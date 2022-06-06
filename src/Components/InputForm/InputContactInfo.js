import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useDataStore } from "../../Stores/DataContext"
import { observer } from "mobx-react-lite"

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function InputContactInfo({ handleNext }) {
  const store = useDataStore()

  const [submitAttempted, setSubmitAttempted] = useState(false)

  const orgNameError = store.orgName === ""
  const contactNameError = store.contactName === ""
  const contactEmailError = !isValidEmail(store.contactEmail)

  function orgChanged(e) {
    store.orgName = e.target.value
  }

  function contactNameChanged(e) {
    store.contactName = e.target.value
  }

  function contactEmailChanged(e) {
    store.contactEmail = e.target.value
  }

  function contactInfoSubmit() {
    if (orgNameError || contactNameError || contactEmailError) {
      setSubmitAttempted(true)
    } else {
      handleNext()
    }
  }

  return (
    <>
      <Box sx={{ m: 3 }}>
        <div style={{ width: "100%", margin: "auto" }}>
          <h5>Contact Info</h5>
          <TextField
            sx={{ mb: 1 }}
            fullWidth
            required
            label="Organization Name"
            value={store.orgName}
            onChange={orgChanged}
            variant="standard"
            error={orgNameError && submitAttempted}
          />
          <TextField
            sx={{ mb: 1 }}
            fullWidth
            required
            onChange={contactNameChanged}
            label="Contact Name"
            value={store.contactName}
            variant="standard"
            error={contactNameError && submitAttempted}
          />
          <TextField
            fullWidth
            required
            onChange={contactEmailChanged}
            label="Contact Email"
            value={store.contactEmail}
            variant="standard"
            error={contactEmailError && submitAttempted}
          />
        </div>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button variant="outlined" onClick={contactInfoSubmit}>
          Next
        </Button>
      </Box>
    </>
  )
}

export default observer(InputContactInfo)
