import { AuthState } from './auth';
import { UserProfileState } from './user-profile';
import { RouterStateUrl } from './router';
import { MessagesState } from './messages';

export interface AppState {
  router: RouterStateUrl;
  auth: AuthState;
  messages: MessagesState;
  userProfile: UserProfileState;
}
