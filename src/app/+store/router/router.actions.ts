import { createAction, props } from '@ngrx/store';

import { NavigationExtras } from '@angular/router';

interface RouterPayload {
  path: any[],
  queryParams?: object,
  extras?: NavigationExtras
}

const BASE = '[Router]';

export const go = createAction(
  `${BASE} GO`,
  props<{ payload: RouterPayload }>(),
);

export const back = createAction(
  `${BASE} BACK`,
);

export const forward = createAction(
  `${BASE} FORWARD`,
);
