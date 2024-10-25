import { Status, User } from '@libs/models';

export interface Channel {
  id: string;
  name: string;
  description: string;
  uid: string;
  createdBy?: User;
  starred?: boolean;
  private: boolean;
  status?: Status;
}
