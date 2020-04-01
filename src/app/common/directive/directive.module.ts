import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectiveRoutingModule } from './directive-routing.module';
import { DragDirective } from './drag.directive';


@NgModule({
  declarations: [DragDirective],
  imports: [
    CommonModule,
    DirectiveRoutingModule
  ],
  exports: [
    DragDirective
  ]
})
export class DirectiveModule { }
