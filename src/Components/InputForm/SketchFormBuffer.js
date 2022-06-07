import React from "react"
import Button from "@mui/material/Button"
import Slider from "@mui/material/Slider"
import Alert from "@mui/material/Alert"

export default function SketchFormBuffer({
  buffer,
  setBuffer,
  selected,
  resetButtonClicked,
  sketchGeometry,
  submitButtonClicked,
}) {
  function bufferSliderChanged(e) {
    setBuffer(e.target.value)
  }
  const isPolygon = sketchGeometry && sketchGeometry.type === "polygon"
  return (
    <>
      <Alert sx={{ display: sketchGeometry === null && "none" }} severity="success">
        You drawn geometry has been captured.
      </Alert>

      <div style={{ display: sketchGeometry ? "block" : "none" }}>
        <br />
        <small>Add Buffer ({isPolygon && "Optional - "}In miles)</small>
        <Slider
          size="small"
          disabled={sketchGeometry === null}
          onChange={bufferSliderChanged}
          value={buffer}
          sx={{ width: "80%", marginLeft: "5px" }}
          min={isPolygon ? 0 : 0.1}
          max={10}
          step={0.1}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
        <br />
        <hr />
        <Button
          size="small"
          onClick={resetButtonClicked}
          disabled={sketchGeometry === null}
          variant="outlined">
          Reset Drawing
        </Button>
        {/* <Button
          sx={{ ml: 2 }}
          size="small"
          onClick={submitButtonClicked}
          disabled={sketchGeometry === null}
          variant="outlined"
          color="success">
          Submit
        </Button> */}
      </div>
    </>
  )
}
