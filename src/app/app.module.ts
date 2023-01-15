import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './components/profile/profile.component';
import {AppRoutingModule} from "./app-routing.module";
import {authInterceptorProviders} from "./services/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./services/error-interceptor.service";
import { AccessobjectComponent } from './components/accessobject/accessobject.component';
import { AccessobjectoneComponent } from './components/accessobject/accessobjectone/accessobjectone.component';
import { AccessdocumentoneComponent } from './components/accessdocumentone/accessdocumentone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StyleDirective } from './directives/style.directive';
import {MaterialModule} from "./modules/material/material.module";
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    AccessobjectComponent,
    AccessobjectoneComponent,
    AccessdocumentoneComponent,
    StyleDirective,
    NavigationComponent,
    SearchComponent,
    UserinfoComponent,
    UsersComponent
  ],
    imports: [
      AppRoutingModule,
      BrowserModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MaterialModule
    ],
  providers: [authInterceptorProviders, authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
