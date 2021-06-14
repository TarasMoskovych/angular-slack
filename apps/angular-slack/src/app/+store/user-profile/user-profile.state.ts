export interface UserProfileState {
  photoURL: string | ArrayBuffer;
  loading: boolean;
  updated: boolean;
}

export const initialUserProfileState: UserProfileState = {
  photoURL: null,
  loading: false,
  updated: false
};
