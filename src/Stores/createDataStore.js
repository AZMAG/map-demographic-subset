import { makeAutoObservable } from "mobx"

export function createDataStore() {
  return makeAutoObservable({
    view: null,
    map: null,
    mapLoaded: false,
    bgLayerView: null,
    orgName: "",
    contactName: "",
    contactEmail: "",
    sketchGeometry: null,
    bufferGeometry: null,
  })
}
