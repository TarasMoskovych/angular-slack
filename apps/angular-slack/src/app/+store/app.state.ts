import { AuthState } from './auth';
import { UserProfileState } from './user-profile';
import { RouterStateUrl } from './router';
import { MessagesState } from './messages';
import { ChannelsState } from './channels';
import { ThemesState } from './themes';

export interface AppState {
  router: RouterStateUrl;
  auth: AuthState;
  channels: ChannelsState;
  messages: MessagesState;
  themes: ThemesState;
  userProfile: UserProfileState;
}
