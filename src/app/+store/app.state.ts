import { AuthState } from './auth';
import { SideState } from './side';
import { RouterStateUrl } from './router';

export interface AppState {
  router: RouterStateUrl;
  auth: AuthState;
  side: SideState;
}
