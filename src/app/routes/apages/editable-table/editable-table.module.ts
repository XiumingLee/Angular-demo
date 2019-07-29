import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { EditableTableRoutingModule } from './editable-table-routing.module';
import { EditableTableComponent } from './editable-table.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    EditableTableRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    EditableTableComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class EditableTableModule { }
