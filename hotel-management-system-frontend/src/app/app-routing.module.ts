import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: "full"},
  {
    path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'auth', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'share', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
