import { AuthError, Channel, FirebaseUser, User } from '../shared';

export const channel: Channel = {
  description: 'Test description',
  id: '1234-5678',
  name: 'Test name',
  uid: '12345677',
  createdBy: {
    email: 'abc@gmail.com',
    displayName: 'Name',
  },
};

export const user: User = {
  email: 'abc@gmail.com',
  displayName: 'Test',
  starredChannels: [channel.id],
};

export const firebaseUser: FirebaseUser = {
  email: 'abc@gmail.com',
  displayName: 'Test',
  emailVerified: true,
} as FirebaseUser;

export const error = {
  message: 'Error',
} as AuthError;
