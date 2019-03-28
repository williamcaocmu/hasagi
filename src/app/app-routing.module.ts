import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { AddNewAccountComponent } from "./main/admin/add-new-account/add-new-account.component";
import { AdminComponent } from "./main/admin/admin.component";
import { ImportListAccountComponent } from "./main/admin/import-list-account/import-list-account.component";
import { ManageAccountComponent } from "./main/admin/manage-account/manage-account.component";
import { AuthService } from "./login/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { PmComponent } from "./main/pm/pm.component";
import { ManageProjectsComponent } from "./main/pm/manage-projects/manage-projects.component";
import { ProjectFormComponent } from "./main/pm/project-form/project-form.component";
import { PublicDocumentComponent } from "./main/pm/public-document/public-document.component";
import { DocumentFormComponent } from "./main/pm/document-form/document-form.component";
import { AllDocumentsComponent } from "./main/pm/all-documents/all-documents.component";
import { NewPublicDocumentComponent } from "./main/pm/new-public-document/new-public-document.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "main",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: "main",
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuardService],
        children: [
          {
            path: "add-new-account",
            component: AddNewAccountComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: "import-list-account",
            component: ImportListAccountComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: "manage-account",
            component: ManageAccountComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: ":id",
            component: AddNewAccountComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: "manage-projects/add",
            component: ProjectFormComponent,
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: "pm",
        component: PmComponent,
        canActivate: [AuthGuardService],
        children: [
          {
            path: "manage-projects",
            component: ManageProjectsComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: "import-list-account",
            component: ImportListAccountComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: "manage-projects/view/all-document",
            component: AllDocumentsComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: "manage-projects/view/public-document",
            component: NewPublicDocumentComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: "manage-projects/:id",
            component: ProjectFormComponent,
            canActivate: [AuthGuardService]
          },

          {
            path: "manage-projects/view/:id",
            component: PublicDocumentComponent,
            canActivate: [AuthGuardService]
          },

          {
            path: "manage-projects/view/:id/add",
            component: DocumentFormComponent,
            canActivate: [AuthGuardService]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
