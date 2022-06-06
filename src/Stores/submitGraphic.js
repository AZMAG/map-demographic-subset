import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Graphic from "@arcgis/core/Graphic"

import * as urlUtils from "@arcgis/core/core/urlUtils"

const url = "https://geo.azmag.gov/arcgis/rest/services/Hosted/5310_Map_Submissions/FeatureServer/0"

export default async function submitGraphic(store) {
  urlUtils.addProxyRule({
    urlPrefix: "geo.azmag.gov",
    proxyUrl: "https://geo.azmag.gov/Proxy/proxy.ashx",
  })

  const layer = new FeatureLayer({ url })
  const attributes = {
    orgname: store.orgName,
    contactname: store.contactName,
    contactemail: store.contactEmail,
  }
  const feature = new Graphic({
    geometry: store.bufferGeometry ? store.bufferGeometry : store.sketchGeometry,
    attributes,
  })

  const res = await layer.applyEdits({
    addFeatures: [feature],
  })
  return res
}
