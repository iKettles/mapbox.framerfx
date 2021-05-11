export type GeoJSONCoordinate = [number, number]

export interface GeoJSON {
    type: "Feature"
    properties: {}
    geometry: {
        coordinates: GeoJSONCoordinate[]
        type: "LineString"
    }
}

export function convertWaypointsToGeoJSON<
    T extends { latitude: number; longitude: number }
>(waypoints: T[]): GeoJSON {
    return {
        type: "Feature",
        properties: {},
        geometry: {
            coordinates: waypoints.map((waypoint) => [
                waypoint.longitude,
                waypoint.latitude,
            ]),
            type: "LineString",
        },
    }
}
