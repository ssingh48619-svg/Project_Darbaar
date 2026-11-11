import { CuratedAsset } from "./types";

/**
 * Curated Assets Inventory
 * Live assets are loaded dynamically from MongoDB Atlas through DARBAAR Curatorial API.
 * Genuine specimens can be published directly from the Directorate Administration console (/admin).
 */
export const CURATED_ASSETS: CuratedAsset[] = [];
