import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

let NewsServiceSocket: Socket;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() {
    NewsServiceSocket = io("wss://localhost:3000");
    NewsService.execute()
  }

  private static execute() {
    let user = JSON.parse(sessionStorage["user"]);
    NewsServiceSocket.emit("news-subscribe", {token: user.id}); // sessionStorage["auth_token"]}
  }

  CreatedNews(func: () => void)
  {
    NewsServiceSocket.removeAllListeners("createdNews");
    // console.log("aervicw");
    NewsServiceSocket.on("createdNews", () => {
      func();
    });
  }


}
