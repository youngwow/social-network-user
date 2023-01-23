import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../models/post";
import {IUser} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: any
  // @Input() name: string

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
