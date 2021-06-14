import { Status } from './status.model';
import { User } from './user.model';

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
