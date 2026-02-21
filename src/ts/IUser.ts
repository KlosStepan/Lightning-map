// ts/IUser.ts

interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt?: string;
  avatar?: number;

  // Google SSO Fields, opt.
  avatarUrl?: string;   // <-- Optional, AvatarURL Google
  googleId?: string;    // <-- Optional, Google ID
  authSource?: string;  // <-- Optional, field like authsource: "google"

  // NEW: per-type caps
  maxEshops?: number;
  maxMerchants?: number;
}

export default IUser;