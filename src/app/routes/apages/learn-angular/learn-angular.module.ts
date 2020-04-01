import {Inject, NgModule} from '@angular/core';
import { SharedModule } from '@shared';
import { LearnAngularRoutingModule } from './learn-angular-routing.module';
import { NavigationPageComponent } from './navigation-page/navigation-page.component';
import { LessonAaaComponent } from './lesson-aaa/lesson-aaa.component';
import { LessonBbbComponent } from './lesson-bbb/lesson-bbb.component';
import {DirectiveModule} from "../../../common/directive/directive.module";

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    LearnAngularRoutingModule,
    DirectiveModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    NavigationPageComponent,
    LessonAaaComponent,
    LessonBbbComponent,
  ],
  providers:[
    {provide: 'BASE_CONFIG',useValue: 'https://xiuminglee.cn'}
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class LearnAngularModule { }

