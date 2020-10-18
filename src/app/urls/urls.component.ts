import { Router } from '@angular/router';
import { UrlService } from './../url.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.css']
})
export class UrlsComponent implements OnInit {

  constructor(private url:UrlService,private route:Router) { }
  Allurls;
  Urldata={originalurl:"",shorturl:""};

  ngOnInit(): void {
    this.getallUrls();
  }
  Create()
  {
    this.url.createUrl(this.Urldata);
    window.location.reload();
   
  }
  getallUrls()
  {
  this.url.urls.subscribe((data)=>
  {
    this.Allurls=data;
    console.log(this.Allurls);
    
  })

  
  }
}