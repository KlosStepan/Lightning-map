// ts/IMerchant.ts
import IBaseEntity from "./IBaseEntity"; // Import IBaseEntity
import ISocial from "./ISocial";

// Define the ISocial type for individual social links
/*interface ISocial {
  network: 'web' | 'facebook' | 'instagram' | 'twitter'; // Supported networks
  label: string; // Label like "Web", "FB", "IG", "X"
  link: string; // URL of the social link
}*/

// Define the IAddress type for the merchant's address details
interface IAddress {
  address: string; // Street address
  city: string; // City name
  postalCode: string; // Postal code
}

// Define IMerchantTile extending IBaseEntity
interface IMerchantTile extends IBaseEntity {
  image: string;
  address: IAddress; // Address object of type IAddress
  tags: string[]; // Array of tags like ["Shops", "Services"]
  socials: ISocial[]; // Array of ISocial objects
}

// Define the main IMerchant type representing a GeoJSON feature
interface IMerchant {
  type: 'Feature'; // Fixed as 'Feature' for GeoJSON
  geometry: {
    coordinates: [number, number]; // Tuple of latitude and longitude
    type: 'Point'; // Fixed as 'Point' for GeoJSON
  };
  properties: IMerchantTile; // Properties object of type IMerchantTile
}

interface IMerchantADWrapper {
  documentid: string
  merchant: IMerchant
}

export default IMerchant;
export type { /*ISocial,*/ IMerchantTile, IAddress, IMerchantADWrapper };
