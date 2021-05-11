export function getBearing(
    startLat: number,
    startLng: number,
    destLat: number,
    destLng: number
) {
    startLat = toRadians(startLat)
    startLng = toRadians(startLng)
    destLat = toRadians(destLat)
    destLng = toRadians(destLng)

    const y = Math.sin(destLng - startLng) * Math.cos(destLat)
    const x =
        Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng)

    let bearing = Math.atan2(y, x)
    bearing = toDegrees(bearing)
    return (bearing + 360) % 360
}

// Converts from degrees to radians.
function toRadians(degrees: number) {
    return (degrees * Math.PI) / 180
}

// Converts from radians to degrees.
function toDegrees(radians: number) {
    return (radians * 180) / Math.PI
}

interface Coordinates {
    latitude: number
    longitude: number
}

export function haversineDistance(
    pointA: Coordinates,
    pointB: Coordinates
): number {
    var radius = 6371 // km

    //convert latitude and longitude to radians
    const deltaLatitude = ((pointB.latitude - pointA.latitude) * Math.PI) / 180
    const deltaLongitude =
        ((pointB.longitude - pointA.longitude) * Math.PI) / 180

    const halfChordLength =
        Math.cos((pointA.latitude * Math.PI) / 180) *
            Math.cos((pointB.latitude * Math.PI) / 180) *
            Math.sin(deltaLongitude / 2) *
            Math.sin(deltaLongitude / 2) +
        Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2)

    const angularDistance =
        2 *
        Math.atan2(Math.sqrt(halfChordLength), Math.sqrt(1 - halfChordLength))

    return radius * angularDistance
}
