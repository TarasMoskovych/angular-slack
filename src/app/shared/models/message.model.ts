import { FirestoreFieldValue } from './firebase.model';
import { User } from './user.model';

export interface Message {
  id: number;
  uid: string;
  channelId: string;
  content: string;
  timestamp: FirestoreFieldValue;
  user: User;
}
