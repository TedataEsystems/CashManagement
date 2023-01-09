import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './shared/modules/login/login.module';
import { LayoutModule } from './shared/modules/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';





@NgModule({
  declarations: [
    AppComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    NgxSpinnerModule,
    LayoutModule,
    MaterialModule,


  ],
  providers: [Title,
              {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
