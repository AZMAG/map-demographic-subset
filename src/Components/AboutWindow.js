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
      <p>Welcome to MAG's 5310 Map Submission Tool</p>
      <p>
        This tool is meant to be used in addition to MAG's main application process. After
        submitting your drawn geography, a demographic estimate will be shown. To get started, fill
        in your contact info and click "Next".
      </p>
      <p>
        For more information, please contact <b>Hezequias Rocha</b>
      </p>
    </div>
  )
}
