import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { sideReducer, SideEffects } from 'src/app/+store';

import { SharedModule } from 'src/app/shared/shared.module';

import { SidePanelComponent } from './side-panel.component';
import { SidePanelHeaderComponent, SidePanelUserComponent } from './components';

@NgModule({
  declarations: [
    SidePanelComponent,
    SidePanelHeaderComponent,
    SidePanelUserComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('side', sideReducer),
    EffectsModule.forFeature([SideEffects]),
  ],
  exports: [
    SidePanelComponent
  ]
})
export class SidePanelModule { }
