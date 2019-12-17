import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalTransferRoutingModule } from './modal-transfer-routing.module';
import { ModalTransferComponent } from './modal-transfer.component';
import {
  NzAvatarModule,
  NzCardModule,
  NzFormModule, NzGridModule,
  NzIconModule, NzInputModule,
  NzRadioModule,
  NzTabsModule,
  NzTransferModule,
  NzTreeModule
} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ModalTransferComponent],
  imports: [
    CommonModule,
    ModalTransferRoutingModule,
    NzTabsModule,
    NzCardModule,
    NzTransferModule,
    NzTreeModule,
    NzRadioModule,
    FormsModule,
    NzFormModule,
    NzIconModule,
    NzGridModule,
    NzAvatarModule,
    NzInputModule
  ]
})
export class ModalTransferModule { }
