import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {IPost} from "../models/post";
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: IPost[];

  uri = 'https://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<IPost[]> {
    const opts = { params: new HttpParams({fromString: "_limit=50"}) };
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts', opts).pipe(
        tap(posts => {
          this.posts = posts;
        })
    )
  }
  getPostsByUserId(userID: number): Observable<IPost[]>{
    // // Возвращает один пост, а нужно несколько
    // const opts = { params: new HttpParams({fromString: "_limit=10"}) };
    // return this.http.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, opts).pipe(
    //   tap(posts => {
    //     this.posts = posts;
    //   })
    // )
    return this.http.get<IPost[]>(this.uri + `/posts/${userID}`).pipe(map(
        (resp: any) => {
          return resp;
        }
      )
    );
  }
  getPostsFriendsByUserId(userID: number): Observable<IPost[]>{
    return this.http.get<IPost[]>(this.uri + `/postsFriends/${userID}`).pipe(map(
        (resp: any) => {
          return resp;
        }
      )
    );
  }

  addNews(post: { title: string; userID: number; content: string }) {
    this.http.post(this.uri + '/addNews', {post: post}).subscribe(() => {
      // console.log(res);
    });
  }
}
