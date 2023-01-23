import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {IUser} from "../models/user";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<IUser>;
  user: IUser;
  uri = 'https://localhost:3000/api';
  name: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getAllUser();
  }

  getAllUser(): Observable<IUser[]>{
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users').pipe(
      tap(users => {
        this.users = users;
      })
    )
  }

  // @ts-ignore
  getCurrentUser(): IUser{
    if (this.authService.logIn){
      // this.authService.logIn проверяет наличие user'а
      // @ts-ignore
      return JSON.parse(sessionStorage.getItem('user'));
    }
  }

  getUserFriends(userID: number): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.uri + `/friends/${userID}`).pipe(map(
        (resp: any) => {
          return resp;
        }
      )
    );
  }

  // getName(userID: number): Subscription{
  //   return
  // }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.uri + `/user/${id}`).pipe(map(
        (resp: any) => {
          //return resp;
          return resp.user;
        }
      )
    );
  }


  uploadPhoto(fd: FormData, id: number, cb: () => void) {
    // console.log(fd.get('image'));
    this.http.post(this.uri + `/addUserPhoto/${id}`, fd).subscribe((res: any) => {
      let user: any = JSON.parse(sessionStorage.getItem("user")!);
      user.photo = res.filename;
      sessionStorage.setItem("user", JSON.stringify(user))
      cb();
      }
    );
  }


  deletePhoto(id: number, cb: () => void) {
    this.http.delete(this.uri + `/deletePhoto/${id}`).subscribe((res: any) => {
        let user: any = JSON.parse(sessionStorage.getItem("user")!);
        user.photo = res.filename;
        sessionStorage.setItem("user", JSON.stringify(user))
        cb();
      }
    );
  }

  addFriend(userId: number, email: string): Observable<any> {
    return this.http.post(this.uri + `/addFriend/${userId}`, {friendEmail: email}).pipe(map(
      (resp: any) => {
        return resp.isSuccess;
      }
    ))
  }

  deleteFriend(userId: number, friendId: number) {
    //console.log(userId, friendId);
    return this.http.post(this.uri + `/deleteFriend/${userId}`, {friendId: friendId}).pipe(map(
      (resp: any) => {
        return resp.isSuccess;
      }
    ));
  }
}
