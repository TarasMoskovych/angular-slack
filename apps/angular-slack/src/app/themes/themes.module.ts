import { NgModule } from '@angular/core';
import { SharedModule } from '@angular-slack/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ColorSketchModule } from 'ngx-color/sketch';

import { ThemesEffects, themesReducer } from '../+store';
import { ThemesComponent } from './themes.component';
import {
  ThemeComponent,
  ThemePickerComponent,
} from './components';

@NgModule({
  declarations: [
    ThemesComponent,
    ThemeComponent,
    ThemePickerComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('themes', themesReducer),
    EffectsModule.forFeature([ThemesEffects]),
    ColorSketchModule,
  ],
  exports: [
    ThemesComponent,
  ],
})
export class ThemesModule { }
