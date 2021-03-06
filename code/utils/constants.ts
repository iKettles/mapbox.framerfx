//! Lists of default constant values for map properties

import { MapSpatialCoordinates } from "./types"

/* Change below to your Mapbox acccount's access token. Get Mapbox account here: https://goo.gl/mr8X4i */
const accessToken =
    "pk.eyJ1IjoibXNsZWUiLCJhIjoiY2psdnB6cXN0MHd3bjNwb2R6bWFtbmg4eSJ9.DMA9TUmO4G_vDIkb6RDtZA"

const optionsAndTitles = (obj: { [key: string]: string }) => {
    return Object.keys(obj)
        .map((key) => {
            return {
                key,
                value: obj[key],
            }
        })
        .reduce(
            (lists, kvp) => {
                lists.titles.push(kvp.key)
                lists.options.push(kvp.value)
                return lists
            },
            { titles: [] as string[], options: [] as string[], dict: obj }
        )
}

const CoreStyles = optionsAndTitles({
    MapboxDark: "mapbox://styles/mapbox/dark-v9",
    MapboxLight: "mapbox://styles/mapbox/light-v9",
    MapboxOutdoors: "mapbox://styles/mapbox/outdoors-v10",
    MapboxSatellite: "mapbox://styles/mapbox/satellite-v9",
    MapboxSatelliteStreets: "mapbox://styles/mapbox/satellite-streets-v10",
    MapboxStreets: "mapbox://styles/mapbox/streets-v10",
})

const DesignerStyles = optionsAndTitles({
    LabelMaker: "mapbox://styles/mapbox/cje59h2m22g4x2sjzbsv1lc42",
    LeShine: "mapbox://styles/mapbox/cjcunv5ae262f2sm9tfwg8i0w",
    Moonlight: "mapbox://styles/mapbox/cj3kbeqzo00022smj7akz3o1e",
    NorthStar: "mapbox://styles/mapbox/cj44mfrt20f082snokim4ungi",
    Scenic: "mapbox://styles/mapbox/cj8gg22et19ot2rnz65958fkn",
    Standard: "mapbox://styles/mapbox/cj4k8wmwy5lbt2smsigkbh18e",
    Terminal: "mapbox://styles/mapbox/cj62n87yx3mvi2rp93sfp2w9z",
    LATerrain: "mapbox://styles/mapbox/cjerxnqt3cgvp2rmyuxbeqme7",
    Vintage: "mapbox://styles/mapbox/cj7at0rnp9ei22rtegvjf58dx",
    Whaam: "mapbox://styles/mapbox/cj5banmps1bqr2rqwsy5aeijw",
})

const cityCoordinates = {
    "Amsterdam, Netherlands": {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 12,
    },
    "Austin, USA": { latitude: 30.267153, longitude: -97.743057, zoom: 10 },
    "Barcelona, Spain": { latitude: 41.385063, longitude: 2.173404 },
    "Beijing, China": { latitude: 39.904202, longitude: 116.407394 },
    "Chicago, USA": { latitude: 41.878113, longitude: -87.629799 },
    "Detroit, USA": { latitude: 42.331429, longitude: -83.045753 },
    "Dubai, UAE": { latitude: 25.204849, longitude: 55.270782 },
    "Helsinki, Findland": { latitude: 60.169857, longitude: 24.938379 },
    "Hong Kong, China": { latitude: 22.280308, longitude: 114.177007 },
    "Las Vegas, USA": { latitude: 36.169941, longitude: -115.139832 },
    "London, United Kingdom": { latitude: 51.507351, longitude: -0.127758 },
    "Los Angles, USA": { latitude: 34.052235, longitude: -118.243683 },
    "New York City, USA": { latitude: 40.712776, longitude: -74.005974 },
    "Paris, France, USA": { latitude: 48.856613, longitude: 2.352222 },
    "Portland, USA": { latitude: 45.51223, longitude: -122.658722 },
    "Rome, Italy": { latitude: 41.902782, longitude: 12.496365 },
    "San Francisco, USA": { latitude: 37.774929, longitude: -122.419418 },
    "Seattle, USA": { latitude: 47.606209, longitude: -122.332069 },
    "Shanghai, China": { latitude: 31.230391, longitude: 121.473701 },
    Singapore: { latitude: 1.28431, longitude: 103.869666 },
    "Sydney, Australia": { latitude: -33.87276, longitude: 151.20534 },
    "Tokyo, Japan": { latitude: 35.687427, longitude: 139.786879 },
    "Vienna, Austria": { latitude: 48.208176, longitude: 16.373819 },
    "Washington DC, USA": { latitude: 38.893, longitude: -77.032 },
}

export const Defaults = {
    accessToken,
}

export const Styles = {
    core: CoreStyles,
    designer: DesignerStyles,
    custom: "Custom",
    default: CoreStyles.dict.MapboxLight,
}

export const Cities = {
    coordinates: cityCoordinates,
    names: Object.keys(cityCoordinates).sort(),
}

// WORKAROUND Framer does not like empty string as option
export const LOCAL_LANGUAGE = "LOCAL_LANGUAGE"
export const Languages = optionsAndTitles({
    Local: LOCAL_LANGUAGE,
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
    Russian: "ru",
    Chinese: "zh",
    "Simplified Chinese": "zh-Hans",
    Portuguese: "pt",
    Arabic: "ar",
    Japanese: "ja",
    Korean: "ko",
})

export const MapControlPositions = optionsAndTitles({
    "Top Center": "top-center",
    "Top Left": "top-left",
    "Top Right": "top-right",
    // "Bottom Right": "bottom-right",
    // "Bottom Left": "bottom-left",
})

export const defaultLocations: MapSpatialCoordinates[] = [
    {
        latitude: 51.507351,
        longitude: -0.127758,
        bearing: 0,
        pitch: 0,
        zoom: 14,
    },
    {
        latitude: 34.052235,
        longitude: -118.243683,
        bearing: 0,
        pitch: 0,
        zoom: 11,
    },
    {
        latitude: 24.052235,
        longitude: -118.243683,
        bearing: 0,
        pitch: 0,
        zoom: 11,
    },
    {
        latitude: 29.052235,
        longitude: -100.243683,
        bearing: 0,
        pitch: 0,
        zoom: 11,
    },
]
