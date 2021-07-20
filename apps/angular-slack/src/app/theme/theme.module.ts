import { NgModule } from '@angular/core';
import { SharedModule } from '@angular-slack/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { ThemeComponent } from './theme.component';
import { themesReducer } from '../+store';

@NgModule({
  declarations: [
    ThemeComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('themes', themesReducer),
  ],
  exports: [
    ThemeComponent,
  ],
})
export class ThemeModule { }
