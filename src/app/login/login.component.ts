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
  this.auth.checksession().subscribe((d)=>
  {
    this.auth.session=d;
  })
  this.auth.googleLogin();
}
loginwithfb()
{
  this.auth.fbLogin();
}

}
