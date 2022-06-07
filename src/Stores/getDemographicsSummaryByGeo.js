import * as query from "@arcgis/core/rest/query"

import * as geometryEngineAsync from "@arcgis/core/geometry/geometryEngineAsync"
const url = "https://geo.azmag.gov/arcgis/rest/services/maps/ACSLatest/MapServer/0"

export default async function getDemographicsSummaryByGeo(geo) {
  const fields = [
    { label: "Age 65+", field: "AGE65PLUS" },
    { label: "Minority", field: "MINORITY_POP" },
    { label: "Income below poverty level", field: "INCOME_BELOW_POVERTY" },
    { label: "No vehicles available", field: "NO_VEHICLE" },
  ]

  const q = {
    geometry: geo,
    returnGeometry: true,
    outFields: [
      "AGE65PLUS",
      "MINORITY_POP",
      "INCOME_BELOW_POVERTY",
      "NO_VEHICLE",
      "SQMI",
      "OBJECTID",
    ],
  }

  const { features } = await query.executeQueryJSON(url, q)

  const intersectPromises = []
  for (let i = 0; i < features.length; i++) {
    const intersection = geometryEngineAsync.intersect(geo, features[i].geometry)
    intersectPromises.push(intersection)
  }

  const intersectFeatures = await Promise.all(intersectPromises)

  const areaPromises = intersectFeatures.map((feature) =>
    geometryEngineAsync.geodesicArea(feature, "square-miles"),
  )
  const areas = await Promise.all(areaPromises)

  const summary = {}

  features.forEach(({ attributes }, i) => {
    const allocationPct = areas[i] / attributes.SQMI

    fields.forEach(({ label, field }) => {
      summary[label] = summary[label] || { pop: 0, popAll: 0 }
      summary[label].pop += Math.round(attributes[field] * allocationPct)
      summary[label].popAll += attributes[field]
    })
  })

  const summaryRows = fields.map(({ label, field }) => {
    return {
      id: label,
      pop: summary[label].pop,
      popAll: summary[label].popAll,
    }
  })

  summaryRows.push({
    id: "Total Area (In SQMI)",
    pop: features.reduce((a, b) => {
      return a + b.attributes.SQMI
    }, 0),
    popAll: areas.reduce((a, b) => a + b, 0),
  })

  return {
    summary: summaryRows,
    bgData: [features, intersectFeatures, areas],
  }
}
