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
import { CoverLetterComponent } from './Report/cover-letter/cover-letter.component';
import { MissionFormComponent } from './Report/mission-form/mission-form.component';
import { ExpensesFormComponent } from './Report/expenses-form/expenses-form.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path:'',
  component:LoginComponent,
 },
  {
    path:'login',
  component:LoginComponent,
 },

  {
    path:'mission',
    component: LayoutComponent,
    children: [
    //   {
    //   path:'',
    //   component: DashboardComponent,
    //   canActivate:[AuthGuardGuard]

    // },

    {
      path:'',
      component: SummaryComponent,
      canActivate:[AuthGuardGuard]
    },
    {
      path:'user',
      component: UserComponent,
      canActivate:[AuthGuardGuard]
    },
    {
      path:'role',
      component: RoleComponent,
      canActivate:[AuthGuardGuard]
    },
    {
      path:'jobDegree',
      component: JobDegreeComponent,
      canActivate:[AuthGuardGuard]
    },
    {
      path:'missionType',
      component: MissionTypeComponent,
      canActivate:[AuthGuardGuard]
    },
    {
      path:'status',
      component: ApproveStatusComponent,
      canActivate:[AuthGuardGuard]
    },

    {
      path:'history',
      component: LogsComponent,
      canActivate:[AuthGuardGuard]

    },
    {
      path:'cover',
      component: CoverLetterComponent,
      canActivate:[AuthGuardGuard]
    },
    {
      path:'missionform',
      component: MissionFormComponent,
      canActivate:[AuthGuardGuard]

    },
    {
      path:'expenses',
      component: ExpensesFormComponent,
      canActivate:[AuthGuardGuard]
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
