import { UrlService } from './../url.service';


import { AuthService, User } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public auth:AuthService,private url:UrlService) {}

  ngOnInit(): void {
    this.auth.checkloggedin();
    this.url.getUrl();

  }
}
