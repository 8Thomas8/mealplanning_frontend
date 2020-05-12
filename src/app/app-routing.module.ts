import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './user-dashboard/dashboard/dashboard.component';
import {AccountComponent} from './account/account.component';
import {AuthenticationGuard} from './guards/authentication.guard';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]},
  {path: 'my-account', component: AccountComponent, canActivate: [AuthenticationGuard]},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
