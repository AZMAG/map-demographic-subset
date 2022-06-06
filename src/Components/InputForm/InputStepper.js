import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Typography from "@mui/material/Typography"

import InputContactInfo from "./InputContactInfo"
import SketchFrom from "./SketchForm"
import SubmitForm from "./SubmitForm"
import FormFinalScreen from "./FormFinalScreen"
import DemographicSummary from "./DemographicSummary"

const steps = [
  { label: "Contact Info", id: "contact" },
  { label: "Draw Application Area", id: "draw" },
  { label: "Submit", id: "submit" },
]

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label, Component }, index) => {
          const stepProps = {}
          const labelProps = {}
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <FormFinalScreen />
      ) : (
        <React.Fragment>
          {steps[activeStep].id === "contact" && <InputContactInfo handleNext={handleNext} />}
          {steps[activeStep].id === "draw" && (
            <SketchFrom handleNext={handleNext} handleBack={handleBack} />
          )}
          {steps[activeStep].id === "submit" && (
            <SubmitForm handleNext={handleNext} handleBack={handleBack} />
          )}
        </React.Fragment>
      )}
    </Box>
  )
}
