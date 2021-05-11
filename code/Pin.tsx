import * as React from "react"
import { Marker } from "react-map-gl"
import { ComponentInstance } from "./hooks/useConnectedComponentInstance"

interface Props {
    size?: number
    title?: string
    longitude: number
    latitude: number
    offsetLeft?: number
    offsetTop?: number
    component?: ComponentInstance
    onClick?: () => void
}

const defaultPin = (props: Props) => {
    const {
        longitude,
        latitude,
        offsetLeft = 0,
        offsetTop = 0,
        component,
    } = props

    return (
        <Marker longitude={longitude} latitude={latitude}>
            {!component ? (
                <div
                    style={{
                        background: "white",
                        padding: 4,
                        borderRadius: 4,
                        transform: "translateX(-50%)",
                    }}
                >
                    {props.title}
                </div>
            ) : (
                React.cloneElement(component, {
                    width: component.props.width,
                    height: component.props.height,
                    style: {
                        width: component.props.width,
                        height: component.props.height,
                        left: -(component.props.width / 2) + offsetLeft,
                        top: -(component.props.height / 2) + offsetTop,
                        ...component.props.style,
                        position: "relative",
                    },
                })
            )}
        </Marker>
    )
}

export const Pin = defaultPin
