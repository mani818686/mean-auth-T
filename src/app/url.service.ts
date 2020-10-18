import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  urls=new BehaviorSubject<any>("");
  constructor(private http:HttpClient,private route:Router,private auth:AuthService) { }

  async createUrl(Urls)
  {
    let res = await this.http.post('https://social--auth.herokuapp.com/createurl', {urls:Urls}).toPromise();
    
  }
   async getUrl()
  { 
    let user='mani9989';
    console.log(this.auth.user);
    
    let d=await this.http.get("https://social--auth.herokuapp.com/urls/"+user).toPromise();
    console.log(d["data"]);
    this.urls.next(d["data"]);
  }
}
