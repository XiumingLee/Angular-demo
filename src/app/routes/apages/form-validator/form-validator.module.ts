import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FormValidatorRoutingModule } from './form-validator-routing.module';
import { FormValidatorComponent } from './form-validator.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    FormValidatorRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    FormValidatorComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FormValidatorModule { }
