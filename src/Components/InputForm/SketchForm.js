import { useState, useEffect } from "react"

import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel"
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine"

import Graphic from "@arcgis/core/Graphic"

import SketchFormButtons from "./SketchFormButtons"
import { useDataStore } from "../../Stores/DataContext"
import { observer } from "mobx-react-lite"

import SketchFormBuffer from "./SketchFormBuffer"
import MouseTooltip from "react-sticky-mouse-tooltip"

function SketchForm({ handleBack, handleNext }) {
  const store = useDataStore()
  const [selected, setSelected] = useState(null)
  const zoomTo = true
  const [buffer, setBuffer] = useState(0)

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
    store.bufferLayer.removeAll()
    if (store.sketchGeometry && buffer) {
      const bufferGeo = geometryEngine.buffer(store.sketchGeometry, buffer, "miles")
      store.bufferGeometry = bufferGeo
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

      store.bufferLayer.add(bufferGfx)
    }
  }, [store, store.sketchGeometry, buffer, store.bufferLayer])

  useEffect(() => {
    if (zoomTo) {
      if (store.bufferGeometry) {
        store.view.goTo({
          target: store.bufferGeometry,
        })
      } else if (store.sketchGeometry) {
        store.view.goTo({
          target: store.sketchGeometry,
        })
      }
    }
  }, [store.sketchGeometry, store.bufferGeometry, store.view, zoomTo])

  sketchViewModel.on(["create"], (e) => {
    if (e.state === "complete") {
      store.sketchLayer.removeAll()
      store.sketchLayer.add(e.graphic)
      setSelected(null)
      store.sketchGeometry = e.graphic.geometry

      if (e.graphic.geometry.type !== "polygon") {
        setBuffer(1)
      }
    }
  })

  // async function submitButtonClicked() {
  //   alert("Submitting...")
  // }

  function resetButtonClicked() {
    store.sketchLayer.removeAll()
    store.bufferLayer.removeAll()
    setSelected(null)
    store.sketchGeometry = null
    store.bufferGeometry = null
  }

  return (
    <>
      <div style={{ textAlign: "left", padding: "20px" }}>
        <SketchFormButtons
          sketchGeometry={store.sketchGeometry}
          selected={selected}
          setSelected={setSelected}
        />
        <SketchFormBuffer
          buffer={buffer}
          setBuffer={setBuffer}
          selected={selected}
          resetButtonClicked={resetButtonClicked}
          sketchGeometry={store.sketchGeometry}
          // submitButtonClicked={submitButtonClicked}
        />
        <MouseTooltip visible={selected !== null} offsetX={15} offsetY={10}>
          <div className="drawing-tooltip">
            Click anywhere on the map to draw a {selected?.title}
          </div>
        </MouseTooltip>
        <div style={{ display: !selected && "none" }}>
          Click anywhere on the map to start drawing your application's area
        </div>
      </div>
    </>
  )
}

export default observer(SketchForm)
