import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import LinearProgress from "@mui/material/LinearProgress"

import { useDataStore } from "../../Stores/DataContext"
import getDemographicsSummaryByGeo from "../../Stores/getDemographicsSummaryByGeo"
import submitGraphic from "../../Stores/submitGraphic"

import DemographicSummary from "./DemographicSummary"

export default function FormFinalScreen() {
  const store = useDataStore()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])

  useEffect(() => {
    ;(async () => {
      const res = await submitGraphic(store)
      const _rows = await getDemographicsSummaryByGeo(store.sketchGeometry, store.bufferGeometry)
      setRows(_rows)
      setLoading(false)
    })()
  }, [store.sketchGeometry, store.bufferGeometry, store])

  return (
    <>
      <br />
      {loading ? (
        <>
          <h6 variant="h6">Submitting...</h6>
          <LinearProgress />
        </>
      ) : (
        <>
          <Alert severity="success">
            <Typography>Thank you, MAG has received your submission.</Typography>
          </Alert>
          <br />
          <DemographicSummary rows={rows} />
        </>
      )}
    </>
  )
}
