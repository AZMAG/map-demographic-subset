import React from "react"
import "./about.scss"

import MagLogo from "../Images/mag-logo-vert-2.png"

export default function AboutWindow() {
  return (
    <div className="about-window">
      <img
        style={{
          margin: "auto",
          width: "100%",
          paddingLeft: "20%",
          paddingRight: "20%",
          marginBottom: "20px",
        }}
        src={MagLogo}
        alt="MAG's Logo"
      />
      <br />
      <p>Welcome to MAG's Custom Block Group Summary Tool</p>
      <p>
        This tool is meant to be used in addition to MAG's AZ Demographics Viewer to get a small
        subset of demographic fields for use in various grant applications. After selecting an area
        of interest, the tool will generate a summary of the block groups intersecting the drawn
        area.
      </p>
      <p>
        For more information, please contact <b>Edward Brown</b>
      </p>
    </div>
  )
}
