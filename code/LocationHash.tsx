import * as React from "react"
import { MapViewportCoordinates } from "./utils/types"

const LocationHash = (props: MapViewportCoordinates) => {
    const { bearing, pitch, longitude, latitude, zoom } = props

    const locationData: { [key: string]: string } = {
        lon: longitude && longitude.toFixed(3),
        lat: latitude && latitude.toFixed(3),
        z: zoom && zoom.toFixed(2),
    }

    if (bearing || pitch) {
        locationData["b"] = bearing && bearing.toFixed(0)
        locationData["p"] = pitch && pitch.toFixed(0)
    }

    return (
        <div style={containerStyle}>
            <p style={hashStyle}>
                {Object.keys(locationData).map((key, i) => {
                    return (
                        <span key={key}>
                            {/* Workaround for space separated values */}
                            {i > 0 && " "}
                            {key}:{" "}
                            <span style={boldValueStyle}>
                                {locationData[key]}
                            </span>
                        </span>
                    )
                })}
            </p>
        </div>
    )
}

export default LocationHash

const hashStyle: React.CSSProperties = {
    backgroundColor: "rgba(31, 51, 73, .75)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "9999px",
    letterSpacing: "1px",
}

const containerStyle: React.CSSProperties = {
    pointerEvents: "none",
    zIndex: 2,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: "30px",
    width: "100%",
}

const boldValueStyle: React.CSSProperties = {
    fontWeight: 700,
}
