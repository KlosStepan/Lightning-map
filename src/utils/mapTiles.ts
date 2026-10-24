// CARTO basemaps require an API key (passed as ?key=); without one they serve
// "API KEY REQUIRED" watermark tiles. Fall back to OSM tiles when no key is set.
const CARTO_API_KEY = process.env.REACT_APP_CARTO_API_KEY;

const OSM_ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const MAP_TILE_URL = CARTO_API_KEY
    ? `https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(CARTO_API_KEY)}`
    : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export const MAP_TILE_ATTRIBUTION = CARTO_API_KEY
    ? `${OSM_ATTRIBUTION} &copy; <a href="https://carto.com/attributions">CARTO</a>`
    : OSM_ATTRIBUTION;
