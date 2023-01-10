import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LogsComponent } from './component/logs/logs.component';
import { ApproveStatusComponent } from './component/settings/approve-status/approve-status.component';
import { JobDegreeComponent } from './component/settings/job-degree/job-degree.component';
import { MissionTypeComponent } from './component/settings/mission-type/mission-type.component';
import { RoleComponent } from './component/settings/role/role.component';
import { UserComponent } from './component/user/user.component';
import { SummaryComponent } from './component/summary/summary.component';
import { ErrorPageComponent } from './shared/component/error-page/error-page.component';
import { LayoutComponent } from './shared/component/layout/layout.component';
import { LoginComponent } from './shared/component/login/login.component';

const routes: Routes = [
  {
    path:'login',
  component:LoginComponent,
 },
  {
    path:'',
    component: LayoutComponent,


    children: [
      {
      path:'',
      component: DashboardComponent,

    },

    {
      path:'summary',
      component: SummaryComponent,

    },
    {
      path:'user',
      component: UserComponent,

    },
    {
      path:'role',
      component: RoleComponent,

    },
    {
      path:'jobDegree',
      component: JobDegreeComponent,

    },
    {
      path:'missionType',
      component: MissionTypeComponent,

    },
    {
      path:'status',
      component: ApproveStatusComponent,

    },

    {
      path:'history',
      component: LogsComponent
    },
    {
      path:'**',
     pathMatch: 'full',
    component:ErrorPageComponent,
    }




    ]

  },
  {
    path:'**',
   pathMatch: 'full',
  component:ErrorPageComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
