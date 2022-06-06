import React, { useRef, useEffect } from "react"
import { render } from "react-dom"
import ArcGISMap from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Expand from "@arcgis/core/widgets/Expand"
import Zoom from "@arcgis/core/widgets/Zoom"
import Home from "@arcgis/core/widgets/Home"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"

import AboutWindow from "./AboutWindow"
import InputForm from "./InputForm/InputForm"

import { useDataStore } from "../Stores/DataContext"

import "./map.scss"

function MainMap() {
  const store = useDataStore()
  const mapDiv = useRef(null)

  useEffect(() => {
    if (mapDiv.current) {
      const acsBlockGroupsLayer = new FeatureLayer(
        "https://geo.azmag.gov/arcgis/rest/services/maps/ACSLatest/MapServer/0",
        { opacity: 0.9, title: "Existing Land Use" },
      )

      const sketchLayer = new GraphicsLayer()
      const bufferLayer = new GraphicsLayer()

      const _map = new ArcGISMap({
        basemap: "streets-navigation-vector",
        layers: [bufferLayer, sketchLayer],
      })

      const _view = new MapView({
        map: _map,
        container: mapDiv.current,
        extent: {
          spatialReference: 102100,
          xmax: -12185571.37263326,
          xmin: -12742032.938549075,
          ymax: 4072017.803964638,
          ymin: 3775747.8823314374,
        },
        constraints: {
          rotationEnabled: false,
          minZoom: 7,
        },
        ui: {
          components: [],
        },
        popup: {
          dockEnabled: false,
          collapseEnabled: false,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
          },
        },
      })
      store.map = _map
      store.view = _view
      ;(async () => {
        store.mapLoaded = true

        const home = new Home({ view: _view })
        _view.ui.add(home, "top-left")

        const zoom = new Zoom({ view: _view })
        _view.ui.add(zoom, "top-left")

        let basemapGallery = new BasemapGallery({
          view: _view,
        })

        const infoNode = document.createElement("div")

        const infoExpand = new Expand({
          expandIconClass: "esri-icon-description",
          view: _view,
          expanded: true,
          content: infoNode,
        })

        render(<AboutWindow />, infoNode)

        _view.ui.add(infoExpand, "bottom-right")

        const basemapGalleryExpand = new Expand({
          expandIconClass: "esri-icon-basemap",
          view: _view,
          content: basemapGallery,
        })

        _view.ui.add(basemapGalleryExpand, "top-left")

        store.sketchLayer = sketchLayer
        store.bufferLayer = bufferLayer
      })()
    }
  }, [store])

  return <div className="mapDiv" ref={mapDiv}></div>
}

export default MainMap
