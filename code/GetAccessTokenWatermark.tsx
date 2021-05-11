import * as React from "react"

interface Props {}

const GetAccessTokenWatermark: React.FC<Props> = (props) => {
    return (
        <a
            style={overlayStyle}
            href="https://account.mapbox.com/access-tokens/?pluginName=FramerX"
        >
            Get your access token
        </a>
    )
}

export default GetAccessTokenWatermark

GetAccessTokenWatermark.defaultProps = {}

const overlayStyle: React.CSSProperties = {
    position: "absolute",
    alignSelf: "flex-start",
    fontSize: "1.5em",
}
