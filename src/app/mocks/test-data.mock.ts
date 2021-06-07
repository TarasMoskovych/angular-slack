import { AuthError, AuthUserCredential, Channel, FirebaseUserInfo, Message, User } from '../shared';

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
  password: '123456',
  starredChannels: [channel.id],
  uid: Date.now().toString(),
};

export const firebaseUser = {
  email: 'abc@gmail.com',
  displayName: 'Test',
  emailVerified: true,
  updateProfile: jasmine.createSpy(),
} as any;

export const userCredential: AuthUserCredential = {
  credential: {
    providerId: '1234',
    signInMethod: 'password',
    toJSON: jasmine.createSpy(),
  },
  user: {
    ...user,
    sendEmailVerification: () => Promise.resolve(),
    updateProfile: () => Promise.resolve(),
  } as any,
};

export const userInfo: FirebaseUserInfo = {
  displayName: user.displayName,
  email: user.email,
  phoneNumber: '12345',
  photoURL: user.photoURL,
  uid: user.uid,
  providerId: '1234'
};

export const error = {
  message: 'Error',
} as AuthError;

export const message: Message = {
  id: Date.now(),
  channelId: channel.id,
  content: 'text1',
  timestamp: Date.now() as any,
  user: { ...user },
};

export const message2: Message = {
  id: Date.now(),
  channelId: channel.id,
  content: 'text2',
  timestamp: Date.now() as any,
  user: { ...user, uid: '1234' },
};
