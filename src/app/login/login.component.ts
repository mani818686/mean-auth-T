import { UrlService } from './../url.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    
  }
loginwithgoogle()
{
  this.auth.googleLogin();
}
loginwithfb()
{
  this.auth.fbLogin();
}

}
