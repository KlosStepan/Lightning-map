interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt?: string;
  avatar?: number; // <-- Add this line
}

export default IUser