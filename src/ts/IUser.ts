interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt?: string;
  avatar?: number;

  // Google SSO fields (optional)
  avatarUrl?: string;   // <-- Add this line
  googleId?: string;    // <-- Optional, if used
  authSource?: string;  // <-- Optional, if used
}

export default IUser;