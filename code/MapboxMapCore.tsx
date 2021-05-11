import * as React from "react"
import ReactMapGL, { FlyToInterpolator, MapRef } from "react-map-gl"
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map"
import GetAccessTokenWatermark from "./GetAccessTokenWatermark"
import LocationHash from "./LocationHash"
import { Defaults, Styles } from "./utils/constants"
import { transformRequest } from "./utils/transformRequest"
import { MapViewportCoordinates } from "./utils/types"

export interface MapboxMapCoreProps extends InteractiveMapProps {
    width: React.ReactText
    height: React.ReactText

    accessTokenURL: string
    accessToken?: string

    anonymousStyle: string
    authenticatedStyle: string
    userStyle: string

    showLocationText: boolean
    children?: React.ReactNode
    showSearch?: boolean

    latitude: number
    longitude: number
    zoom: number
    bearing: number
    pitch: number

    onUpdateViewport: (viewport: Partial<MapViewportCoordinates>) => void
}

export interface State {
    viewport: MapViewportCoordinates
}

const MapboxMapCore: React.FC<MapboxMapCoreProps> = (props) => {
    const {
        accessToken,
        anonymousStyle,
        authenticatedStyle,
        userStyle,
        showLocationText,
        onUpdateViewport,
        ...rest
    } = props
    const mapRef = React.useRef<MapRef>()
    const mapStyle = React.useMemo(() => {
        if (!accessToken) {
            return anonymousStyle || Styles.default
        }

        // authenticated
        if (authenticatedStyle === Styles.custom) {
            return userStyle || Styles.default
        }

        return authenticatedStyle || Styles.default
    }, [accessToken, authenticatedStyle, userStyle, anonymousStyle])

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <ReactMapGL
                ref={mapRef}
                mapboxApiAccessToken={accessToken || Defaults.accessToken}
                transformRequest={transformRequest}
                mapStyle={mapStyle}
                onViewportChange={onUpdateViewport}
                {...rest}
            >
                {!accessToken && <GetAccessTokenWatermark />}
                {props.children}
                {showLocationText && <LocationHash {...rest} />}
            </ReactMapGL>
        </div>
    )
}

MapboxMapCore.defaultProps = {
    width: 375,
    height: 375,
    latitude: 52.3676,
    longitude: 4.9041,
    zoom: 0,
    bearing: 0,
    pitch: 0,
    anonymousStyle: Styles.default,
    authenticatedStyle: Styles.default,
    userStyle: "",
    showLocationText: false,
}

export default MapboxMapCore
