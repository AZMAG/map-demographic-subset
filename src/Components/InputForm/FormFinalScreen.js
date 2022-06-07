import { useEffect, useState } from "react"
import LinearProgress from "@mui/material/LinearProgress"

import { useDataStore } from "../../Stores/DataContext"
import getDemographicsSummaryByGeo from "../../Stores/getDemographicsSummaryByGeo"

import DemographicSummary from "./DemographicSummary"
import { observer } from "mobx-react-lite"

function FormFinalScreen() {
  const store = useDataStore()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const _data = await getDemographicsSummaryByGeo(store.sketchGeometry, store.bufferGeometry)
      setData(_data)
      setLoading(false)
    })()
  }, [store.sketchGeometry, store.bufferGeometry, store])

  return (
    <div style={{ display: store.sketchGeometry || store.bufferGeometry ? "" : "none" }}>
      {loading ? (
        <>
          <h6 variant="h6">Analyzing...</h6>
          <LinearProgress />
        </>
      ) : (
        <>
          <DemographicSummary data={data} />
        </>
      )}
    </div>
  )
}
export default observer(FormFinalScreen)
