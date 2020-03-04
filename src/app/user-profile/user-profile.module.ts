import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileEffects, userProfileReducer } from '../+store';

import { SharedModule } from '../shared/shared.module';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileViewComponent, UserProfileEditComponent } from './components';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileViewComponent,
    UserProfileEditComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('user-profile', userProfileReducer),
    EffectsModule.forFeature([UserProfileEffects]),
  ],
  exports: [UserProfileComponent]
})
export class UserProfileModule { }
