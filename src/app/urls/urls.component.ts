import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UrlService } from './../url.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css']
})
export class UrlsComponent implements OnInit {

  constructor(public url:UrlService,private route:Router,private http:HttpClient) { }
  Allurls;
  haserror;
  Urldata={originalurl:"",shorturl:"https://social--auth.herokuapp.com/"};
  ngOnInit(): void {
    this.haserror=false;
    this.getallUrls();
  }
  async Create()
  {
      this.url.createUrl(this.Urldata);
      console.log(this.Urldata);
      this.url.flag=true;
    //window.location.href="/";
  }
  getallUrls()
  {
  this.url.urls.subscribe((data)=>
  {
    this.Allurls=data;
    console.log(this.Allurls);
    
  })
  }
  async Validate()
  {
    this.haserror=false;
    if(this.Urldata.shorturl=="https://social--auth.herokuapp.com/")
    {
      this.haserror=true;
    }
    else
    {
      let result = await this.http.get('https://social--auth.herokuapp.com/checkurl/'+encodeURIComponent(this.Urldata.shorturl)).toPromise();
    console.log(result);
    if(!result["status"]){
      this.haserror=true;
    }
  }
  console.log(this.haserror);
    
  }
}
