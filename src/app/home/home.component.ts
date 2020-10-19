import { Router } from '@angular/router';
import { UrlService } from './../url.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private url:UrlService,private route:Router) { }

  ngOnInit(): void {
    if(this.url.flag)
      {this.url.flag=false;
        this.route.navigateByUrl("/urls");
      }
    
  }

}
