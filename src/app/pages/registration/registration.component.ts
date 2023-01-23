import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  firstName: string;
  lastName: string;
  date: Date;
  email: string;
  password: string;
  confirm_password: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  createAccount(){
    if (this.checkValues()){
      let user = {
        name: {
          firstName: this.firstName,
          lastName: this.lastName
        },
        dateBirth: this.date,
        email: this.email,
        password: this.password
      }
      this.authService.createAccount(user);
    }
  }

  checkValues(){
    return (this.firstName && this.lastName &&
      this.date && this.email &&
      this.password && this.confirm_password &&
      this.password === this.confirm_password);
  }
}
