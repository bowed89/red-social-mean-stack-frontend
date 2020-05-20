import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MomentModule } from 'angular2-moment';


import { appRoutingProviders, routing } from './app.routing';

import { AppComponent } from './app.component';

// Modulo Messages
import { MessagesModule } from './messages/messages.module';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

// Servicios para el guard
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    ProfileComponent,
    PublicationsComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MomentModule,
    MessagesModule
  ],
  providers: [
    appRoutingProviders,
    UserGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
