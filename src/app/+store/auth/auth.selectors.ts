import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const getLoading = (state: AuthState) => state.loading;
const getUser = (state: AuthState) => state.user;

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const authSubmitSelector = createSelector(getAuthState, getLoading);
export const authUserSelector = createSelector(getAuthState, getUser);
