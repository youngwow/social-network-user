import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";
import {IUser} from "../../models/user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  private uri = "https://localhost:3000";
  private id: number;

  loading = false;
  currentUser: IUser | void;
  firstName: any;
  lastName: any;
  countFriends: number;
  selectedFile: File;
  imagePath = '';

  constructor(
    public postService: PostService,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.userService.getCurrentUser();
    this.firstName = this.currentUser?.name.firstName;
    this.lastName = this.currentUser?.name.lastName;
    this.imagePath = this.uri + this.currentUser?.photo;
    //this.user = this.userService.getUser(1)
    // TODO: fix that asap
    this.id = this.currentUser?.id;
    this.userService.getUserFriends(this.id).subscribe((res: any) => {
      this.countFriends = res.users.length;
    })
    // @ts-ignore
    this.postService.getPostsByUserId(this.id).subscribe(() => {
      this.loading = false;
    })
  }

  onFileSelected(event: any){
    //console.log(event)
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    // let photo = document.getElementById("photo");
    // // @ts-ignore
    // let fd = new FormData(photo);
    this.userService.uploadPhoto(fd, this.id, () => {
      this.currentUser = this.userService.getCurrentUser();
      this.imagePath = this.uri + this.currentUser?.photo;
    });
  }

  deletePhoto(){
    this.userService.deletePhoto(this.id, () => {
      this.currentUser = this.userService.getCurrentUser();
      this.imagePath = this.uri + this.currentUser?.photo;
    })
  }

}
