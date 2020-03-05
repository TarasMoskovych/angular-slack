import { AuthState } from './auth';
import { UserProfileState } from './user-profile';
import { RouterStateUrl } from './router';

export interface AppState {
  router: RouterStateUrl;
  auth: AuthState;
  userProfile: UserProfileState;
}
