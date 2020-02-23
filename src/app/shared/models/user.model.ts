export interface User {
  displayName?: string;
  email: string;
  password?: string;
  photoURL?: string;
  emailVerified?: boolean;
  uid?: string;
  updateProfile?: Function;
}
