import { AuthState } from './auth';
import { RouterStateUrl } from './router';

export interface AppState {
  router: RouterStateUrl;
  auth: AuthState;
}
