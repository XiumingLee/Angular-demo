import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CascadeSelectionComponent } from './cascade-selection.component';

const routes: Routes = [
  { path: '', component: CascadeSelectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CascadeSelectionRoutingModule { }
