import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {AccessobjectComponent} from "./components/accessobject/accessobject.component";
import {AccessobjectoneComponent} from "./components/accessobject/accessobjectone/accessobjectone.component";
import {SearchComponent} from "./components/search/search.component";
import {UserinfoComponent} from "./components/userinfo/userinfo.component";
import {AccessdocumentoneComponent} from "./components/accessdocumentone/accessdocumentone.component";
import {UsersComponent} from "./components/users/users.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', redirectTo: 'profile/search'},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService],
  children: [
    { path: 'search', component: SearchComponent, canActivate: [AuthGuardService] },
    { path: 'objects', component: AccessobjectComponent, canActivate: [AuthGuardService] },
    { path: 'objects/:id', component: AccessobjectoneComponent, canActivate: [AuthGuardService] },
    { path: 'documents/:id', component: AccessdocumentoneComponent, canActivate: [AuthGuardService] },
    { path: 'me', component: UserinfoComponent, canActivate: [AuthGuardService] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] }
  ]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
