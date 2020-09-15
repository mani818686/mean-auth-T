
import { AuthService, User } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth:AuthService) {}
  user:User;
  ngOnInit(): void {
    this.auth.userStatus.subscribe((usr)=>
    {
      this.user=usr;
    })
  }

}
