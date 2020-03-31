import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { LearnTypescriptRoutingModule } from './learn-typescript-routing.module';
import { NavigationPageComponent } from './navigation-page/navigation-page.component';
import { LessonAaaComponent } from './lesson-aaa/lesson-aaa.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    LearnTypescriptRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    NavigationPageComponent,
    LessonAaaComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class LearnTypescriptModule { }
