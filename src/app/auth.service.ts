import { Injectable } from '@angular/core';
import { SocialAuthService,GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public session;
  public user;
  constructor(private auth:SocialAuthService,private http:HttpClient,private router:Router) { }
  async googleLogin() {
    try {
    let socialUser = await this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
    let res = await this.http.post('https://social--auth.herokuapp.com/api/google/verify', {token: socialUser.idToken}).toPromise();
    let status=await this.http.get('https://social--auth.herokuapp.com/api/session').toPromise(); 
    this.user=status["user"];
    console.log(this.user);
    } catch(e){
      console.log("error occured"+e);
    }
  }
  async Logout() {
    await this.auth.signOut();
    let resp=await this.http.get('https://social--auth.herokuapp.com/logout').toPromise();
    console.log("user logged out");
    console.log(resp);
    this.router.navigateByUrl("login");
  }
  async fbLogin() {
    try {
      let socialUser = await this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
    let status=await this.http.get('https://social--auth.herokuapp.com/api/session').toPromise(); 
    this.user=status["user"];
    console.log(this.user);
    } catch(e) {
      console.log("error occured"+e);
    }
  }
 
}

export class User
{
  isLoggedIn:boolean=false;
  details:any=null;
  setUser(isLoggedIn,details)
  {
    this.details=details;
    this.isLoggedIn=isLoggedIn;
  }
}
