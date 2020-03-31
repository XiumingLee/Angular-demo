import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigationPageComponent} from "./navigation-page/navigation-page.component";
import {LessonAaaComponent} from "./lesson-aaa/lesson-aaa.component";

const routes: Routes = [
  { path: '', component: NavigationPageComponent, data: { title: 'TypeScript学习导航页面', titleI18n: 'TypeScript学习导航页面' } },
  { path: 'lesson-aaa', component: LessonAaaComponent, data: { title: '第一课', titleI18n: '第一课' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnTypescriptRoutingModule { }
