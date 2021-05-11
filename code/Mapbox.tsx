import * as React from "react"
import { Source, Layer } from "react-map-gl"
import { ControlType, addPropertyControls } from "framer"
import { Styles } from "./utils/constants"
import { MapSpatialCoordinates, MapViewportCoordinates } from "./utils/types"
import MapboxMapCore, { MapboxMapCoreProps } from "./MapboxMapCore"
import { viewportReducer } from "./lib/viewportReducer"
import {
    ComponentInstance,
    useConnectedComponentInstance,
} from "./hooks/useConnectedComponentInstance"
import { parsedRoute } from "./lib/defaultRoute"
import { Pin } from "./Pin"

window.MAPBOX_DEBUG = false

interface MapboxProps extends MapboxMapCoreProps {
    locations: MapSpatialCoordinates[]
    originPin: ComponentInstance
    destinationPin: ComponentInstance
    trajectoryColor: string
}

export const Mapbox: React.FC<MapboxProps> = (props) => {
    const {
        width,
        height,
        latitude,
        longitude,
        zoom,
        pitch,
        bearing,
        originPin,
        destinationPin,
        trajectoryColor,
        ...rest
    } = props
    const [connectedOriginPin] = useConnectedComponentInstance(originPin)
    const [connectedDestinationPin] = useConnectedComponentInstance(
        destinationPin
    )
    const [viewport, dispatch] = React.useReducer(viewportReducer, {
        width: width as number,
        height: height as number,
        latitude,
        longitude,
        zoom,
        bearing,
        pitch,
    })

    const handleViewportUpdate = React.useCallback(
        (opts: Partial<MapViewportCoordinates>) => {
            dispatch({
                type: "UPDATE_VIEWPORT",
                viewport: opts,
            })
        },
        []
    )

    React.useEffect(() => {
        dispatch({
            type: "UPDATE_VIEWPORT",
            viewport: {
                width,
                height,
                latitude,
                longitude,
                zoom,
                bearing,
                pitch,
            },
        })
    }, [width, height, latitude, longitude, zoom, bearing, pitch])

    const routeLayer = {
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": trajectoryColor,
            "line-width": 4,
        },
    }

    return (
        <div style={containerStyle}>
            <MapboxMapCore
                {...rest}
                {...viewport}
                width={"100%"}
                height={"100%"}
                onUpdateViewport={handleViewportUpdate}
            >
                <Source type={"geojson"} data={parsedRoute}>
                    <Layer {...routeLayer} />
                </Source>
                {connectedOriginPin && (
                    <Pin
                        latitude={parsedRoute.geometry.coordinates[0][1]}
                        longitude={parsedRoute.geometry.coordinates[0][0]}
                        component={connectedOriginPin}
                    />
                )}
                {connectedDestinationPin && (
                    <Pin
                        latitude={
                            parsedRoute.geometry.coordinates[
                                parsedRoute.geometry.coordinates.length - 1
                            ][1]
                        }
                        longitude={
                            parsedRoute.geometry.coordinates[
                                parsedRoute.geometry.coordinates.length - 1
                            ][0]
                        }
                        component={connectedDestinationPin}
                    />
                )}
            </MapboxMapCore>
        </div>
    )
}

Mapbox.defaultProps = {
    ...MapboxMapCore.defaultProps,
    zoom: 11,
}

addPropertyControls(Mapbox, {
    accessToken: { type: ControlType.String, title: "AccessToken" },
    anonymousStyle: {
        type: ControlType.Enum,
        options: Styles.core.options,
        optionTitles: Styles.core.titles,
        title: "Style",
        hidden: (props) => !!props.accessToken,
    },
    authenticatedStyle: {
        type: ControlType.Enum,
        options: Styles.core.options
            .concat(Styles.designer.options)
            .concat(Styles.custom),
        optionTitles: Styles.core.titles
            .concat(Styles.designer.titles)
            .concat(Styles.custom),
        title: "Style",
        hidden: (props) => !props.accessToken,
    },
    userStyle: {
        type: ControlType.String,
        title: " ",
        placeholder: "mapbox://styles/<youraccountID>/<mapstyleID>",
        defaultValue: "mapbox://styles/<youraccountID>/<mapstyleID>",
        hidden: (props) => props.authenticatedStyle !== Styles.custom,
    },
    latitude: {
        title: "Latitude",
        type: ControlType.Number,
        defaultValue: Mapbox.defaultProps.latitude,
    },
    longitude: {
        title: "Longitude",
        type: ControlType.Number,
        defaultValue: Mapbox.defaultProps.longitude,
    },
    zoom: {
        title: "Zoom",
        type: ControlType.Number,
        min: 0,
        displayStepper: true,
        step: 1,
        defaultValue: Mapbox.defaultProps.zoom,
    },
    pitch: {
        title: "Pitch",
        type: ControlType.Number,
        min: 0,
        max: 80,
        defaultValue: Mapbox.defaultProps.pitch,
    },
    bearing: {
        title: "Bearing",
        type: ControlType.Number,
        unit: "°",
        min: 0,
        max: 360,
        defaultValue: Mapbox.defaultProps.bearing,
    },
    trajectoryColor: {
        title: "Line Color",
        type: ControlType.Color,
    },
    originPin: {
        type: ControlType.ComponentInstance,
    },
    destinationPin: {
        type: ControlType.ComponentInstance,
    },
})

const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
}
