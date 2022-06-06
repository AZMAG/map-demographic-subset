import React from "react"
import ReactGA from "react-ga"
import "bootstrap/dist/css/bootstrap.min.css"
import "@arcgis/core/assets/esri/themes/light/main.css"
import "./Styles/App.scss"
import MainMap from "./Components/Map"
import InputForm from "./Components/InputForm/InputForm"
import { DataProvider } from "./Stores/DataContext"

function App() {
  const TRACKING_ID = "UA-29422512-1"
  ReactGA.initialize(TRACKING_ID, {
    debug: false,
    titleCase: false,
    gaOptions: {},
  })

  return (
    <>
      <DataProvider>
        <div className="app-container">
          <MainMap visible={true} />
          <InputForm />
        </div>
      </DataProvider>
    </>
  )
}

export default App
