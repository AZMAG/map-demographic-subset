import { useState, useEffect } from "react"

import Button from "@mui/material/Button"

import pointIcon from "./icons/i_draw_point.png"
import regionIcon from "./icons/i_draw_freepoly.png"
import areaIcon from "./icons/i_draw_rect.png"

export default function SketchFormButtons({ selected, setSelected, sketchGeometry }) {
  const [options, setOptions] = useState([
    {
      id: "point",
      title: "Point of Interest",
      icon: pointIcon,
    },
    {
      id: "polygon",
      title: "Region of Interest",
      icon: regionIcon,
    },
    {
      id: "rectangle",
      title: "Area of Interest",
      icon: areaIcon,
    },
  ])

  useEffect(() => {
    if (selected === null) {
      setOptions((prev) => {
        return prev.map((option) => {
          option.selected = false
          return option
        })
      })
    }
  }, [selected, setOptions])

  function onClick(opt) {
    setOptions((prev) => {
      return prev.map((option) => {
        if (option.id === opt.id) {
          return { ...option, selected: !option.selected }
        } else {
          return { ...option, selected: false }
        }
      })
    })

    if (!opt.selected) {
      setSelected(opt)
    } else {
      setSelected(null)
    }
  }

  return (
    <div style={{ display: (selected || sketchGeometry) && "none" }}>
      <p>Select a drawing tool by clicking one of the buttons below.</p>
      <hr />
      {options.map((option) => (
        <div key={option.id} className="custom-option-container">
          <Button
            className="active"
            onClick={(e) => onClick(option)}
            sx={{
              mr: 2,
              minWidth: 0,
              backgroundColor: option.selected ? "darkgray !important" : "",
            }}
            size="small"
            variant="outlined">
            <img width="25" src={option.icon} alt={option.title} />
          </Button>
          <span>{option.title}</span>
        </div>
      ))}
    </div>
  )
}
