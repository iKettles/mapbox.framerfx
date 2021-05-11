import * as React from "react"

const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    height: "100%",
    backgroundColor: "rgba(137, 86, 255, 0.12)",
    borderRadius: "calc(4px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1))",
    border: "calc(1px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1)) dashed rgb(137, 86, 255)",
}

const textStyles: React.CSSProperties = {
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    wordWrap: "normal",
    color: "rgb(137, 86, 255)",
    fontFamily: "Inter",
    lineHeight: 1.2,
}

export default function Placeholder(props) {
    return (
        <div
            style={{
                ...containerStyle,
                ...(props.small
                    ? {
                          padding: 6,
                      }
                    : {}),
            }}
        >
            <h5
                style={{
                    ...textStyles,
                    fontSize: "calc(13px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1))",
                    fontWeight: 700,
                    marginBottom: "calc(6px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1))",

                    ...(props.small
                        ? {
                              lineHeight: 0.8,
                              marginBottom: 0,
                          }
                        : {}),
                }}
            >
                {props.title}
            </h5>
            <p
                style={{
                    ...textStyles,
                    fontSize: "calc(11px * var(--framerInternalCanvas-canvasPlaceholderContentScaleFactor, 1))",
                }}
            >
                {props.label}
            </p>
        </div>
    )
}
