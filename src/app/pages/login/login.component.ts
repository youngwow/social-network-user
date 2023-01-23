import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  fullname = '';
  password = '';

  constructor(private authService: AuthService) { }
  Login() {
    console.log("you are trying to log in")
    this.authService.login(this.email, this.password);
  }

  ngOnInit(): void {
  }

}
