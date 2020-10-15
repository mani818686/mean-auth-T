import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  session;
  constructor(private auth:AuthService,private router:Router,private http:HttpClient){this.http.get("https://social--auth.herokuapp.com/api/session").subscribe((d)=>
  {
    this.session=d;
  })}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.session){
        return true;
      }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }

} 

}
