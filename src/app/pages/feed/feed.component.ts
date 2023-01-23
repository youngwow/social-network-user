import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {IPost} from "../../models/post";
import {UserService} from "../../services/user.service";
import {NewsService} from "../../services/news.service";
import {IUser} from "../../models/user";
import {FriendsElement} from "../friends/friends.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
  // providers: [PostService]
})
export class FeedComponent implements OnInit {

  @Input() posts: any[]
  //
  // posts: IPost[] = [];
  loading = false;
  title: string;
  message: string
  private userID: number;

  private uri = "https://localhost:3000";

  constructor(
    public postService: PostService,
    public userService: UserService,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.CreatedNews(() => this.updateAllUsers());
    this.updateAllUsers();
  }

  addNews(){
    if (this.message && this.title){
      let post = {
        userID: this.userID,
        title: this.title,
        content: this.message
      }
      this.postService.addNews(post);
      this.title = '';
      this.message = '';
    }
  }

  private updateAllUsers() {
    console.log(`12`);
    let user: IUser = this.userService.getCurrentUser();
    console.log(user.status)
    this.userID = user.id;
    this.postService.getPostsFriendsByUserId(this.userID).subscribe((res: any) => {
      let posts = res.news;
      let friendsPosts: any[] = [];
      if (user.status !== 'banned'){
        for (const post of posts) {
          this.userService.getUser(post.userID).subscribe((res) => {
            let name = res.name.firstName + ' ' + res.name.lastName;
            friendsPosts.push({
              post: post,
              name: name,
              userPicture: this.uri + res.photo
            })
          })
        }
      }

      this.postService.getPostsByUserId(this.userID).subscribe((res: any) => {
        let name = user.name.firstName + ' ' + user.name.lastName;
        for (const news of res.news) {
          friendsPosts.push({
            post: news,
            name: name,
            userPicture: this.uri + user.photo
          })
        }
      })
      this.posts = friendsPosts;
      console.log("POSTS: ", this.posts);
    })
  }
}
