import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarttimeEndtimeComponent } from './starttime-endtime.component';

const routes: Routes = [
  { path: '', component: StarttimeEndtimeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarttimeEndtimeRoutingModule { }
