// Basic Angular imports.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Imports for site functionalities
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// App Components imports
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { AuthService } from './shared/services/auth/auth.service';
import { JwtService } from './shared/services/jwt/jwt.service';
import { DataService } from './shared/services/data/data.service';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';
import { PostEditComponent } from './posts/post-edit/post-edit/post-edit.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserProfileEditComponent } from './users/user-profile-edit/user-profile-edit.component';
import { AuthGuardService } from './shared/services/auth-guard/auth-guard.service';
import { CommentsListComponent } from './comments/comments-list/comments-list.component';
import { CommentCreateComponent } from './comments/comment-create/comment-create.component';
import { MostLikedComponent } from './posts/most-liked/most-liked.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostListComponent,
    PostDetailComponent,
    PostCreateComponent,
    PostEditComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    CommentsListComponent,
    CommentCreateComponent,
    MostLikedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      // Authentication segment
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      // Posting segment
      { path: 'posts', component: PostListComponent, canActivate: [AuthGuardService] },
      { path: 'posts/create', component: PostCreateComponent, canActivate: [AuthGuardService] },
      { path: 'posts/:id', component: PostDetailComponent, canActivate: [AuthGuardService] },
      // Users segment
      { path: 'user/profile-edit', component: UserProfileEditComponent, canActivate: [AuthGuardService] },
      { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuardService] },
    ]),
    JwtModule.forRoot({
      config: {
        // Function for getting a token
        tokenGetter: tokenGetter,
        // Allowed sites
        whitelistedDomains: ['127.0.0.1:8000'],
        // For Header Scheme change:
        authScheme: 'Bearer '
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    JwtService,
    DataService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
