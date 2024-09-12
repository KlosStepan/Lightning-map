// Define the ISocial type for individual social links
interface ISocial {
    network: 'web' | 'facebook' | 'instagram' | 'twitter'; // Supported networks
    label: string; // Label like "Web", "FB", "IG", "X"
    link: string; // URL of the social link
  }
  
  // Define the IMerchantTile type for the properties of a merchant
  interface IMerchantTile {
    description: string; // Description of the merchant
    owner: string | undefined; // Owner ID, can be undefined
    title: string; // Merchant title
    visible: boolean; // Visibility status
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
  
  export default IMerchant;
  export type { ISocial, IMerchantTile };
  