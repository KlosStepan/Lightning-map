// ts/ISocial.ts

interface ISocial {
    network: 'web' | 'facebook' | 'instagram' | 'twitter' | 'threads';
    label: string;
    link: string | null;
}

export default ISocial;