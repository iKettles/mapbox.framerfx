import { addPropertyControls, ControlType } from "framer"
import * as React from "react"
import {
    ComponentInstance,
    useConnectedComponentInstance,
} from "./hooks/useConnectedComponentInstance"
import { viewportReducer } from "./lib/viewportReducer"
import MapboxMapCore, { MapboxMapCoreProps } from "./MapboxMapCore"
import { Pin } from "./Pin"
import { Styles } from "./utils/constants"
import { MapSpatialCoordinates, MapViewportCoordinates } from "./utils/types"

window.MAPBOX_DEBUG = false
interface MapboxProps extends MapboxMapCoreProps {
    locations: MapSpatialCoordinates[]
    currentLocationPin: ComponentInstance
    currentLocationCoordinates: { longitude; latitude }
    showCurrentLocation: boolean
    markerPin: ComponentInstance
    onMarkerClick: (params: { latitude: number; longitude: number }) => void
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
        markerPin,
        showCurrentLocation,
        currentLocationCoordinates,
        currentLocationPin: currentLocationMarker,
        locations,
        onMarkerClick,
        ...rest
    } = props
    const [connectedCurrentLocation] = useConnectedComponentInstance(
        currentLocationMarker
    )
    const [connectedMarker] = useConnectedComponentInstance(markerPin)

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

    console.log()

    console.log(currentLocationCoordinates)
    return (
        <div style={containerStyle}>
            <MapboxMapCore
                {...rest}
                {...viewport}
                width={"100%"}
                height={"100%"}
                onUpdateViewport={handleViewportUpdate}
            >
                {showCurrentLocation && (
                    <Pin
                        marker={{
                            longitude: currentLocationCoordinates.longitude,
                            latitude: currentLocationCoordinates.latitude,
                        }}
                        component={connectedCurrentLocation}
                    />
                )}
                {locations.map((marker) => (
                    <Pin
                        marker={marker}
                        component={connectedMarker}
                        onClick={onMarkerClick}
                    />
                ))}
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
    showCurrentLocation: {
        type: ControlType.Boolean,
        title: "Show Current Location",
        defaultValue: false,
    },
    currentLocationCoordinates: {
        type: ControlType.Object,
        controls: {
            longitude: {
                type: ControlType.Number,
                displayStepper: true,
                defaultValue: 4.88816,
            },
            latitude: {
                type: ControlType.Number,
                displayStepper: true,
                defaultValue: 52.37274,
            },
        },
        hidden: (props) => !props.showCurrentLocation,
    },
    currentLocationPin: {
        type: ControlType.ComponentInstance,
        hidden: (props) => !props.showCurrentLocation,
    },
    markerPin: {
        type: ControlType.ComponentInstance,
    },
    locations: {
        type: ControlType.Array,
        title: "Markers",
        control: {
            type: ControlType.Object,
            title: "Coordinates",
            controls: {
                latitude: {
                    type: ControlType.Number,
                    displayStepper: true,
                    defaultValue: 52.358,
                },
                longitude: {
                    type: ControlType.Number,
                    displayStepper: true,
                    defaultValue: 4.8686,
                },
            },
        },
    },
})

const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
}
