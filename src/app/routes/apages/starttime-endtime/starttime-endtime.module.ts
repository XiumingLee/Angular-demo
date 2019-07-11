import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { StarttimeEndtimeRoutingModule } from './starttime-endtime-routing.module';
import { StarttimeEndtimeComponent } from './starttime-endtime.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    StarttimeEndtimeRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    StarttimeEndtimeComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class StarttimeEndtimeModule { }
