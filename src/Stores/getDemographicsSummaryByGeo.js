import * as query from "@arcgis/core/rest/query"

const url = "https://geo.azmag.gov/arcgis/rest/services/maps/ACSLatest/MapServer/0"

export default async function getDemographicsSummaryByGeo(geo) {
  const fields = [
    { label: "Caucasian", field: "WHITE_NON_HISPANIC" },
    { label: "African American", field: "BLACK_NON_HISPANIC" },
    { label: "Native American", field: "NATIVE_NON_HISPANIC" },
    { label: "Asian", field: "ASIAN_NON_HISPANIC" },
    { label: "Hispanic/Latino - any race", field: "HISPANIC" },
    { label: "Other", field: "TWO_OR_MORE_NON_HISPANIC" },
  ]

  const q = {
    geometry: geo,
    returnGeometry: false,
    outFields: [
      "WHITE_NON_HISPANIC",
      "BLACK_NON_HISPANIC",
      "NATIVE_NON_HISPANIC",
      "ASIAN_NON_HISPANIC",
      "PACIFIC_NON_HISPANIC",
      "OTHER_NON_HISPANIC",
      "TWO_OR_MORE_NON_HISPANIC",
      "HISPANIC",
      "POP_FOR_RACE",
    ],
  }

  const { features } = await query.executeQueryJSON(url, q)
  const summary = {}

  const total = features.reduce((sum, feature) => sum + feature.attributes.POP_FOR_RACE, 0)

  features.forEach(({ attributes }) => {
    fields.forEach(({ label, field }) => {
      summary[label] = summary[label] || 0
      summary[label] += attributes[field]

      summary[label + "_pct"] = summary[label + "_pct"] || 0
      summary[label + "_pct"] += (attributes[field] / total) * 100
    })
  })

  return fields.map(({ label, field }) => {
    return {
      id: label,
      pop: summary[label],
      pct: summary[label + "_pct"],
    }
  })
}
