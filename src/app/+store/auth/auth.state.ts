import { User } from 'src/app/shared';

export interface AuthState {
  loading: boolean;
  user: User;
  authorizeData: User;
}

export const initialAuthState: AuthState = {
  loading: false,
  user: null,
  authorizeData: null
};
