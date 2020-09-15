import { Injectable } from '@angular/core';
import { SocialAuthService,GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:User=new User()
  userStatus=new BehaviorSubject<User>(this.currentUser);
  constructor(private auth:SocialAuthService) { }
  async googleLogin() {
    // Login success
    try {
      let socialUser = await this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.currentUser.setUser(true, socialUser);
//console.log(JSON.stringify(socialUser));
      this.userStatus.next(this.currentUser);
    } catch {
      console.log("error occured");
    }
  }
  async Logout() {
    await this.auth.signOut();
    this.currentUser.setUser(false, null);
    this.userStatus.next(this.currentUser);
  }
  async fbLogin() {
    // Login success
    try {
      let socialUser = await this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.currentUser.setUser(true, socialUser);
      console.log(JSON.stringify(socialUser));
      this.userStatus.next(this.currentUser);
    } catch {
      console.log("error occured");
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