import { Action } from '@ngrx/store';

import { NavigationExtras } from '@angular/router';

interface RouterPayload {
  path: any[],
  queryParams?: object,
  extras?: NavigationExtras
}

export enum RouterActionTypes {
  GO      = '[Router] GO',
  BACK    = '[Router] BACK',
  FORWARD = '[Router] FORWARD'
}

export class Go implements Action {
  readonly type = RouterActionTypes.GO;
  constructor(public payload: RouterPayload) { }
}

export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export type RouterActions = Go | Back | Forward;
