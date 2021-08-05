import { DEFAULT_THEME } from '../+store';
import { AuthError, AuthUserCredential, Channel, FirebaseUserInfo, Message, Theme, User } from '../shared';

export const channel: Channel = {
  private: false,
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
  uid: user.uid,
  channelId: channel.id,
  content: 'text1',
  media: false,
  timestamp: Date.now() as any,
  user: { ...user },
};

export const message2: Message = {
  id: Date.now(),
  uid: '1234',
  channelId: channel.id,
  content: 'text2',
  media: false,
  timestamp: Date.now() as any,
  user: { ...user, uid: '1234' },
};

export const theme: Theme = { ...DEFAULT_THEME };
export const theme2: Theme = { ...DEFAULT_THEME, id: 2 };

export const file = new File([new ArrayBuffer(2e+5)], 'test.png', { lastModified: null, type: 'image/png' });
export const b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
export const photoURL = 'https://firebasestorage.googleapis.com/v0/some-url';
