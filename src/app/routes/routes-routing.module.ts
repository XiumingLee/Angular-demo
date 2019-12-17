import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '首页', titleI18n: '首页' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      { path: 'cascade-selection', loadChildren: () => import('./apages/cascade-selection/cascade-selection.module').then(m => m.CascadeSelectionModule),data: { title: '级联选择示例'} },
      { path: 'starttime-endtime', loadChildren: () => import('./apages/starttime-endtime/starttime-endtime.module').then(m => m.StarttimeEndtimeModule),data: { title: '开始时间结束时间示例'} },
      { path: 'form-checking', loadChildren: () => import('./apages/form-checking/form-checking.module').then(m => m.FormCheckingModule),data: { title: '表单验证'} },
      { path: 'editable-table', loadChildren: () => import('./apages/editable-table/editable-table.module').then(m => m.EditableTableModule),data: { title: '可编辑表格'} },
      { path: 'form-validator', loadChildren: () => import('./apages/form-validator/form-validator.module').then(m => m.FormValidatorModule),data: { title: '动态表单验证'} },
      { path: 'component-test', loadChildren: () => import('./apages/component-test/component-test.module').then(m => m.ComponentTestModule),data: { title: '组件传值测试'} },
      { path: 'modal-transfer', loadChildren: () => import('./apages/modal-transfer/modal-transfer.module').then(m => m.ModalTransferModule),data: { title: '模态框+穿梭框'} },
    ]
  },

  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        scrollPositionRestoration: 'top',
      }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
