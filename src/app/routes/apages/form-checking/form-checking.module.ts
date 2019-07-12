import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FormCheckingRoutingModule } from './form-checking-routing.module';
import { FormCheckingComponent } from './form-checking.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    FormCheckingRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    FormCheckingComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FormCheckingModule { }
