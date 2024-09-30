import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationAddComponent } from './application-add/application-add.component';
import { AuthGuard } from './gaurds/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'viewApplication', component: ApplicationListComponent, canActivate: [AuthGuard] },
  { path: 'addApplication', component: ApplicationAddComponent },
  { path: 'addApplication/:id', component: ApplicationAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
