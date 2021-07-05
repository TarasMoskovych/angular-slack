import { FirestoreFieldValue } from './firebase.model';
import { User } from './user.model';

export interface Message {
  id: number;
  uid: string;
  channelId: string;
  content: string;
  media: boolean;
  timestamp: FirestoreFieldValue;
  user: User;
}
