export interface AuthState {
  loading: boolean;
  user: firebase.User;
}

export const initialAuthState: AuthState = {
  loading: false,
  user: null,
};
