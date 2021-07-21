import { NgModule } from '@angular/core';
import { SharedModule } from '@angular-slack/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { ThemesComponent } from './themes.component';
import { themesReducer } from '../+store';

@NgModule({
  declarations: [
    ThemesComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('themes', themesReducer),
  ],
  exports: [
    ThemesComponent,
  ],
})
export class ThemesModule { }
