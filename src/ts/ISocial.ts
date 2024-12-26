// Define the ISocial type for individual social links
interface ISocial {
    network: 'web' | 'facebook' | 'instagram' | 'twitter' | 'threads'; // Supported networks
    label: string; // Label like "Web", "FB", "IG", "X", "@"
    link: string | null; // URL of the social link
}
export default ISocial;