import { Injectable } from '@angular/core';
import { SocialAuthService,GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:User=new User();
    session;
  userStatus=new BehaviorSubject<User>(this.currentUser);
  constructor(private auth:SocialAuthService,private http:HttpClient,private router:Router) { }
  async googleLogin() {
    try {
      let socialUser = await this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
      //console.log(JSON.stringify(socialUser));
    let res = await this.http.post('https://social--auth.herokuapp.com/api/google/verify', {token: socialUser.idToken}).toPromise();
    this.currentUser.setUser(true, socialUser);
    console.log(this.session);
    this.checksession();
      this.currentUser.setUser(true, socialUser);
      //console.log(JSON.stringify(socialUser));

      this.userStatus.next(this.currentUser);
    } catch(e){
      console.log("error occured"+e);
    }
  }
  async Logout() {
    await this.auth.signOut();
    this.currentUser.setUser(false, null);
    this.userStatus.next(this.currentUser);
    this.router.navigateByUrl("login");
    this.session={'session':null,'status':false};
    console.log(this.session);
  }
  async fbLogin() {
    try {
      let socialUser = await this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.currentUser.setUser(true, socialUser);
      this.userStatus.next(this.currentUser);
    } catch(e) {
      console.log("error occured"+e);
    }
  }
   checksession()
    {
      return this.http.get('https://social--auth.herokuapp.com/api/session');
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
