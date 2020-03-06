import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LedScreenSimulationRoutingModule } from './led-screen-simulation-routing.module';
import { LedScreenSimulationComponent } from './led-screen-simulation.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    LedScreenSimulationRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    LedScreenSimulationComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class LedScreenSimulationModule { }
