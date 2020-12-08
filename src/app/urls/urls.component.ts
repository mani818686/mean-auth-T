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
  submitted:Boolean=false;
  Urldata={originalurl:"",shorturl:""};
  ngOnInit(): void {
    this.haserror=false;
    this.submitted = false;
    this.getallUrls();
  }
  async Create()
  {
      this.url.createUrl(this.Urldata);
      console.log(this.Urldata); 
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
   Validate()
  {
    this.haserror=false;
    this.submitted=false;
    const Url='https://social--auth.herokuapp.com/';
    if(Url+this.Urldata.shorturl==Url)
    {
      this.haserror=true;
    }
    else
    {
     this.http.get(Url+'checkurl/'+encodeURIComponent(Url+this.Urldata.shorturl)).subscribe((data)=>
     {
        console.log(data);
        if(!data["status"])
          this.haserror=true;
          else
          {
            this.Create();
            this.url.getUrl();
            this.submitted=true;
            this.getallUrls();
            //this.Urldata.shorturl=this.Urldata.originalurl="";
          }
      
     })
    
  }
  console.log(this.haserror);
    
  }
}
