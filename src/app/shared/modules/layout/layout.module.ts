import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { LayoutComponent } from '../../component/layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DeleteMsgComponent } from '../../component/delete-msg/delete-msg.component';
import { EditComponent } from 'src/app/component/Forms/edit/edit.component';
import { ChartsModule } from 'ng2-charts';
import { LoaderComponent } from '../../component/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from '../../interceptors/loading.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from '../../component/error-page/error-page.component';
import { LogsComponent } from 'src/app/component/logs/logs.component';
import { SummaryComponent } from 'src/app/component/summary/summary.component';
import { UserComponent } from 'src/app/component/user/user.component';
import { AddMissionComponent } from '../../../component/Forms/add-mission/add-mission.component';
import { AddUserComponent } from '../../../component/Forms/add-user/add-user.component';
import { JobDegreeComponent } from '../../../component/settings/job-degree/job-degree.component';
import { RoleComponent } from '../../../component/settings/role/role.component';
import { MissionTypeComponent } from '../../../component/settings/mission-type/mission-type.component';
import { ApproveStatusComponent } from '../../../component/settings/approve-status/approve-status.component';
import { AddJobComponent } from '../../../component/settings/Forms/add-job/add-job.component';
import { AddRoleComponent } from '../../../component/settings/Forms/add-role/add-role.component';
import { AddMissonTypeComponent } from '../../../component/settings/Forms/add-misson-type/add-misson-type.component';
import { AddApproveStatusComponent } from '../../../component/settings/Forms/add-approve-status/add-approve-status.component';
import { CoverLetterComponent } from '../../../Report/cover-letter/cover-letter.component';
import { MissionFormComponent } from '../../../Report/mission-form/mission-form.component';
import { ExpensesFormComponent } from '../../../Report/expenses-form/expenses-form.component';



@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DeleteMsgComponent,
    EditComponent,
    LoaderComponent,
    ErrorPageComponent,
    LogsComponent,
    SummaryComponent,
    UserComponent,
    AddMissionComponent,
    AddUserComponent,
    JobDegreeComponent,
    RoleComponent,
    MissionTypeComponent,
    ApproveStatusComponent,
    AddJobComponent,
    AddRoleComponent,
    AddMissonTypeComponent,
    AddApproveStatusComponent,
    CoverLetterComponent,
    MissionFormComponent,
    ExpensesFormComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ChartsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),



  ],


  providers:[{provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true}]
})
export class LayoutModule { }
