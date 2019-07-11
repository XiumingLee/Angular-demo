import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CascadeSelectionRoutingModule } from './cascade-selection-routing.module';
import { CascadeSelectionComponent } from './cascade-selection.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    CascadeSelectionRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    CascadeSelectionComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CascadeSelectionModule { }
