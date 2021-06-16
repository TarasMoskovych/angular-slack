import { Status } from '@libs/models';

export interface User {
  displayName?: string;
  email: string;
  password?: string;
  photoURL?: string;
  emailVerified?: boolean;
  uid?: string;
  starredChannels?: string[];
  status?: Status;
}
