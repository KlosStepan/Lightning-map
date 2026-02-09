// ts/IMerchant.ts

import IBaseEntity from "./IBaseEntity"; // Import IBaseEntity
import ISocial from "./ISocial";

interface IAddress {
  address: string;
  city: string;
  postalCode: string;
}

interface IMerchantTile extends IBaseEntity {
  images: string[];
  address: IAddress;
  tags: string[];
  socials: ISocial[];
}

// Define the main IMerchant type representing a GeoJSON feature
interface IMerchant {
  type: 'Feature'; // Fixed as 'Feature' for GeoJSON
  geometry: {
    coordinates: [number, number]; // Tuple of latitude and longitude
    type: 'Point'; // Fixed as 'Point' for GeoJSON
  };
  properties: IMerchantTile; // <-- Actual Merchant information object
}

interface IMerchantADWrapper {
  documentid: string;
  merchant: IMerchant;
}

export default IMerchant;
export type { IMerchantTile, IAddress, IMerchantADWrapper };
