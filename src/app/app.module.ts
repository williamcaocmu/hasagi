import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { AdminComponent } from "./main/admin/admin.component";
import { AddNewAccountComponent } from "./main/admin/add-new-account/add-new-account.component";
import { ImportListAccountComponent } from "./main/admin/import-list-account/import-list-account.component";
import { ManageAccountComponent } from "./main/admin/manage-account/manage-account.component";
import { AuthInterceptor } from "./auth-interceptor";
import { AuthService } from './login/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminServiceService } from './main/admin/admin-service.service';
import { PmComponent } from './main/pm/pm.component';
import { ManageProjectsComponent } from './main/pm/manage-projects/manage-projects.component';
import { PublicDocumentComponent } from './main/pm/public-document/public-document.component';
import { ProjectFormComponent } from './main/pm/project-form/project-form.component';
import { DocumentFormComponent } from './main/pm/document-form/document-form.component';
import { NewPublicDocumentComponent } from './main/pm/new-public-document/new-public-document.component';
import { AllDocumentsComponent } from './main/pm/all-documents/all-documents.component';
import { RouterModule } from '@angular/router';
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AdminComponent,
    AddNewAccountComponent,
    ImportListAccountComponent,
    ManageAccountComponent,
    PmComponent,
    ManageProjectsComponent,
    PublicDocumentComponent,
    ProjectFormComponent,
    DocumentFormComponent,
    NewPublicDocumentComponent,
    AllDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, useValue: en_US, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
