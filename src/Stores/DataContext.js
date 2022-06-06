import { createContext, useContext } from "react"

import Graphic from "@arcgis/core/Graphic"

import { createDataStore } from "./createDataStore"
import { useLocalObservable } from "mobx-react-lite"
import { autorun } from "mobx"
import { configure } from "mobx"

configure({
  enforceActions: "never",
})

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const store = useLocalObservable(createDataStore)
  return <DataContext.Provider value={store}>{children}</DataContext.Provider>
}

export const useDataStore = () => useContext(DataContext)
