import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LedScreenSimulationComponent} from "./led-screen-simulation.component";

const routes: Routes = [
  { path: '', component:LedScreenSimulationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedScreenSimulationRoutingModule { }
