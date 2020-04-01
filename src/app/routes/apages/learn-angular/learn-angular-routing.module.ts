import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigationPageComponent} from "./navigation-page/navigation-page.component";
import {LessonAaaComponent} from "./lesson-aaa/lesson-aaa.component";
import {LessonBbbComponent} from "./lesson-bbb/lesson-bbb.component";

const routes: Routes = [
  { path: '', component: NavigationPageComponent, data: { title: 'Angular学习导航页面', titleI18n: 'Angular学习导航页面' } },
  { path: 'lesson-aaa', component: LessonAaaComponent, data: { title: '依赖注入', titleI18n: '依赖注入' } },
  { path: 'lesson-bbb', component: LessonBbbComponent, data: { title: 'Angular指令', titleI18n: 'Angular指令' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnAngularRoutingModule { }
