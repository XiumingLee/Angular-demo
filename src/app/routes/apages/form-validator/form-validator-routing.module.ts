import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormValidatorComponent } from './form-validator.component';

const routes: Routes = [
  {path:'',component: FormValidatorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormValidatorRoutingModule { }
