import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentTestRoutingModule } from './component-test-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { NzCardModule, NzFormModule, NzListModule, NzSelectModule } from 'ng-zorro-antd';
import { ComponentOneComponent } from './component/component-one/component-one.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListPageComponent, DetailPageComponent, ComponentOneComponent],
  imports: [
    CommonModule,
    ComponentTestRoutingModule,
    NzListModule,
    NzCardModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
  ],
})
export class ComponentTestModule { }
