import { useState, useEffect } from "react"

import "./CustomReportSelection.scss"

import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Slider from "@mui/material/Slider"
import Button from "@mui/material/Button"

import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel"
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine"

import Graphic from "@arcgis/core/Graphic"

import CustomReportSelectionButtons from "./CustomReportSelectionButtons"
import { useDataStore } from "../../../../../Stores/DataContext"
import { observer } from "mobx-react-lite"

import MouseTooltip from "react-sticky-mouse-tooltip"
import getLUSummaryByGeo from "./../../../../../Stores/getLUSummaryByGeo"

function CustomReportSelection() {
  const store = useDataStore()
  const [selected, setSelected] = useState(null)
  const [zoomTo, setZoomTo] = useState(true)
  const [buffer, setBuffer] = useState(0)
  const [sketchGeometry, setSketchGeometry] = useState(null)
  const [bufferGeometry, setBufferGeometry] = useState(null)

  const sketchViewModel = new SketchViewModel({
    layer: store.sketchLayer,
    view: store.view,
    polygonSymbol: {
      type: "simple-fill",
      color: [51, 51, 204, 0.9],
      style: "backward-diagonal",
      outline: {
        color: "black",
        width: 2,
      },
    },
    pointSymbol: {
      type: "simple-marker",
      size: 6,
      color: [51, 51, 204],
    },
    defaultCreateOptions: { hasZ: false },
  })

  useEffect(() => {
    if (selected) {
      sketchViewModel.create(selected.id)
    }
  }, [selected])

  useEffect(() => {
    if (sketchGeometry && buffer) {
      const bufferGeo = geometryEngine.buffer(sketchGeometry, buffer, "miles")
      setBufferGeometry(bufferGeo)
      const bufferGfx = new Graphic({
        geometry: bufferGeo,
        symbol: {
          type: "simple-fill",
          color: [0, 255, 255, 1],
          style: "forward-diagonal",
          outline: {
            color: "cyan",
            style: "dash",
            width: 3,
          },
        },
      })
      store.bufferLayer.removeAll()
      store.bufferLayer.add(bufferGfx)
    }
  }, [sketchGeometry, buffer, store.bufferLayer])

  useEffect(() => {
    if (zoomTo) {
      if (bufferGeometry) {
        store.view.goTo({
          target: bufferGeometry.extent.expand(2.5),
        })
      } else if (sketchGeometry) {
        store.view.goTo({
          target: sketchGeometry.extent.expand(2.5),
        })
      }
    }
  }, [sketchGeometry, bufferGeometry, store.view, zoomTo])

  sketchViewModel.on(["create"], (e) => {
    if (e.state === "complete") {
      store.sketchLayer.removeAll()
      store.sketchLayer.add(e.graphic)
      setSelected(null)
      setSketchGeometry(e.graphic.geometry)
    }
  })

  function zoomToChanged(e) {
    setZoomTo(e.target.checked)
  }

  function bufferSliderChanged(e) {
    setBuffer(e.target.value)
  }

  async function submitButtonClicked() {
    if (bufferGeometry) {
      let reportGfx = new Graphic({
        geometry: bufferGeometry,
      })
      store.reportLoaded = false
      const landUseData = await getLUSummaryByGeo(bufferGeometry)
      reportGfx.attributes = landUseData
      store.reportFeature = { feature: reportGfx }
    } else {
      store.reportLoaded = false
      let reportGfx = new Graphic({
        geometry: sketchGeometry,
      })
      store.reportFeature = { feature: reportGfx }
      const landUseData = await getLUSummaryByGeo(sketchGeometry)
      console.log(landUseData, store.reportFeature.feature)
      store.reportFeature.feature.attributes = landUseData
      store.reportLoaded = true
    }
  }

  function resetButtonClicked() {
    store.sketchLayer.removeAll()
    store.bufferLayer.removeAll()
    setSelected(null)
    setSketchGeometry(null)
    setBufferGeometry(null)
  }

  return (
    <div style={{ textAlign: "left" }}>
      <CustomReportSelectionButtons selected={selected} setSelected={setSelected} />
      <FormControlLabel
        control={<Checkbox onChange={zoomToChanged} defaultChecked />}
        label="Zoom to Selection"
      />
      <br />
      <small>Buffer Selection</small>
      <Slider
        size="small"
        disabled={sketchGeometry === null}
        onChange={bufferSliderChanged}
        value={buffer}
        min={0}
        max={100}
        step={0.1}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <MouseTooltip visible={selected !== null} offsetX={15} offsetY={10}>
        <div className="drawing-tooltip">Click anywhere on the map to draw a {selected?.title}</div>
      </MouseTooltip>
      <Button
        onClick={submitButtonClicked}
        disabled={sketchGeometry === null}
        color="success"
        variant="contained">
        Submit
      </Button>
      <Button
        onClick={resetButtonClicked}
        disabled={sketchGeometry === null}
        sx={{ ml: 2 }}
        variant="contained">
        Reset
      </Button>
    </div>
  )
}

export default observer(CustomReportSelection)
