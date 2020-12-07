import { Injectable } from '@angular/core';
import { SocialAuthService,GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
import { BehaviorSubject, throwError } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { isEmptyExpression } from '@angular/compiler';

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
    console.log(res["user"]);
    this.user=res["user"];
    console.log(this.user);
    if(Object.keys(this.user).length==0)
      throwError("No User");
  } catch(e){
      console.log("error occured"+JSON.stringify(e));
      this.router.navigateByUrl("/login");
    }
    this.router.navigateByUrl("/urls");
  }
  async Logout() {
    var resp;
    try{
      await this.auth.signOut();
    }
    catch(e)
    { 
       console.log("user are already logged out! make sure u r login");
      console.log(e);
    }
    resp=await this.http.get('https://social--auth.herokuapp.com/logout').toPromise();
    console.log("user logged out");
    console.log(resp);
    this.user=null;
    this.router.navigateByUrl("login");
  }
  async fbLogin() {
    try {
      let socialUser = await this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
   
    } catch(e) {
      console.log("error occured"+e);
    }
  }
  async checkloggedin()
  {
    let status=await this.http.get('https://social--auth.herokuapp.com/api/session').toPromise(); 
    this.user=status["user"];
    console.log(this.user);
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
