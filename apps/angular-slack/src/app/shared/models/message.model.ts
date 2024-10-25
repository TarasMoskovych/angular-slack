import { User } from '@libs/models';
import { FirestoreFieldValue } from './firebase.model';

export interface Message {
  id: number;
  uid: string;
  channelId: string;
  content: string;
  media: boolean;
  timestamp: FirestoreFieldValue;
  user: User;
}
