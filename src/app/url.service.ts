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
  public flag:boolean=false;
  public iserror;
  constructor(private http:HttpClient,private route:Router,private auth:AuthService) { }
  
  async createUrl(Urls)
  {
    this.iserror=false;
    let result = await this.http.get('https://social--auth.herokuapp.com/checkurl/'+encodeURIComponent(Urls.shorturl)).toPromise();
    console.log(result);
    if(result["status"]=="true"){
      let res = await this.http.post('https://social--auth.herokuapp.com/createurl', {urls:Urls}).toPromise();
      this.flag=true;
    }
    else
    {
      this.iserror=true;
    }
   
  }
   async getUrl()
  { 
    let status=await this.http.get('https://social--auth.herokuapp.com/api/session').toPromise();
    let user=status["user"].name;
    if(user!=null){
      let d=await this.http.get("https://social--auth.herokuapp.com/urls/"+user).toPromise();
      console.log(d["data"]);
      this.urls.next(d["data"]);
    }
    
  }
  
}
