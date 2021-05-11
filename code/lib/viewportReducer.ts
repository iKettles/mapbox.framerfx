import { MapViewportCoordinates } from "../utils/types"

export interface ViewportState extends MapViewportCoordinates {}

export type Action = {
    type: "UPDATE_VIEWPORT"
    viewport: Partial<MapViewportCoordinates>
}

export function viewportReducer(
    state: ViewportState,
    action: Action
): ViewportState {
    switch (action.type) {
        case "UPDATE_VIEWPORT":
            return {
                ...state,
                ...action.viewport,
                // bearing: state.bearing,
            }
    }
}
