import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { UserComponent } from './user/user.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/sign', pathMatch:'full'},
    {path:'login', component: LoginComponent},
    {path:'user', component: UserComponent,  canActivate:[authGuard]},
    {path:'sign', component:SignComponent} 
];
