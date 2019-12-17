import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalTransferComponent } from './modal-transfer.component';

const routes: Routes = [
  { path: '', component:ModalTransferComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalTransferRoutingModule { }
