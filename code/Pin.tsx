import * as React from "react"
import { Marker } from "react-map-gl"
import { ComponentInstance } from "./hooks/useConnectedComponentInstance"

interface Props {
    marker: { latitude: number; longitude: number }
    component?: ComponentInstance
    onClick?: (params: { latitude: number; longitude: number }) => void
}

const defaultPin = (props: Props) => {
    const { marker, component, onClick } = props

    return (
        <Marker longitude={marker.longitude} latitude={marker.latitude}>
            {!component ? (
                <div
                    style={{
                        background: "white",
                        padding: 4,
                        borderRadius: 4,
                        transform: "translateX(-50%)",
                    }}
                ></div>
            ) : (
                React.cloneElement(component, {
                    width: component.props.width,
                    height: component.props.height,
                    style: {
                        ...component.props.style,
                        width: component.props.width,
                        height: component.props.height,
                        transform: "translateX(-50%)",
                        position: "relative",
                    },
                    onTap() {
                        if (onClick) onClick(marker)
                    },
                })
            )}
        </Marker>
    )
}

export const Pin = defaultPin
