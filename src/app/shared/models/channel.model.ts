import { User } from './user.model';

export interface Channel {
  id: number;
  name: string;
  description: string;
  uid: string;
  createdBy?: User;
}
