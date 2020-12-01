import { AuthService } from './auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PremiumComponent } from './premium/premium.component';
import { ProfileComponent } from './profile/profile.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import { UrlsComponent } from './urls/urls.component';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    SignupComponent,
    PremiumComponent,
    ProfileComponent,
    UrlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '709679406974-ct18mkgug340hf9682gmkm04qhgj8rj4.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '771842850055589'
            ),
          }
        ]
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
