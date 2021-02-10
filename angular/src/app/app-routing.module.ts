import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component' ;
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  {path: 'user', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/add', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'edit/:_id', component: UserComponent, canActivate: [AuthGuard]},
 //{ path: 'user', component: UserComponent}
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
