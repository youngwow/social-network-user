import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: IUser;
  public uri = 'https://localhost:3000/api';
  public token: string;
  public users: IUser[];

  constructor(private http: HttpClient,private router: Router) { }

  login(email: string, password: string) {
    this.http.get(this.uri + '/getUsers').subscribe((data: any) => {
      this.users = data.users;
      console.log(this.users)
      this.http.post(this.uri + '/authenticate', {email: email, password: password, allUsers: JSON.stringify(this.users)})
        .subscribe((resp: any) => {
          this.user = resp.signed_user;
          console.log(this.user);
          this.router.navigate(['profile']);
          sessionStorage.setItem('auth_token', resp.token);
          // TODO: в сессии хранится пароль
          sessionStorage.setItem('user', JSON.stringify(this.user));
          console.log(this.user);
        });
    });
  }

  logout() {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');

    this.router.navigate(['login']);
  }

  public get logIn(): boolean {
    return (sessionStorage.getItem('auth_token') !== null);
  }

  public get isAdmin(): boolean {
    let user = JSON.parse(sessionStorage.getItem('user')!);
    return (user.isAdmin);
  }

  createAccount(user: any){
    this.http.post(this.uri + '/newUser', {user: JSON.stringify(user)})
      .subscribe((resp: any) => {
        this.user = resp.signed_user;
        // console.log(this.user);
        sessionStorage.setItem('auth_token', resp.token);
        // TODO: в сессии хранится пароль
        sessionStorage.setItem('user', JSON.stringify(this.user));
        // console.log(this.user);
        this.router.navigate(['profile']);
      });
  }
}
