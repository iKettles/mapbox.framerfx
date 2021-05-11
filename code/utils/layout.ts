import * as React from "react"

export function forceRelativePositioning(node: React.ReactElement) {
    if (!node) {
        return null
    }
    return React.cloneElement(node, {
        ...node.props,
        style: {
            ...node.props.style,
            position: "relative",
        },
    })
}
