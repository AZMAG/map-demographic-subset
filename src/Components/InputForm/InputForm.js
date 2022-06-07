import SketchForm from "./SketchForm"
import FormFinalScreen from "./FormFinalScreen"
import "./InputForm.scss"

function CustomLegend({ view }) {
  return (
    <div className="input-form-container">
      <SketchForm />
      <FormFinalScreen />
    </div>
  )
}

export default CustomLegend
