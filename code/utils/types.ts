import * as React from "react"

export interface MapSpatialCoordinates {
    longitude: number
    latitude: number
    bearing: number
    pitch: number
    zoom: number
}

export interface MapViewportCoordinates extends MapSpatialCoordinates {
    width: React.ReactText
    height: React.ReactText
}

export interface MapLocation {
    name: string
    category?: string
    details?: string
    location: { longitude: number; latitude: number }
    focusLocation: { zoom?: number; bearing?: number; pitch?: number }
}
