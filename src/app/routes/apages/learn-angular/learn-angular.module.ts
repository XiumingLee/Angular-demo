import {Inject, NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { LearnAngularRoutingModule } from './learn-angular-routing.module';
import { NavigationPageComponent } from './navigation-page/navigation-page.component';
import { LessonAaaComponent } from './lesson-aaa/lesson-aaa.component';
import {Person} from "./modal/person.modal";

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    LearnAngularRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    NavigationPageComponent,
    LessonAaaComponent
  ],
  providers:[
    {provide: 'BASE_CONFIG',useValue: 'https://xiuminglee.cn'}
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class LearnAngularModule { }

