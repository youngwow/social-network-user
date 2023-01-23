import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";

export interface FriendsElement {
  position: number;
  name: string;
  email: string;
  DateBirth: string;
  id: number;
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit{

  ELEMENT_DATA: FriendsElement[] = [];
  displayedColumns: string[];
  dataSource: FriendsElement[];
  email: string;
  private userId: number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.displayPage();
  }

  displayPage(): void{
    this.displayedColumns= ['position', 'name', 'email', 'DateBirth', 'delete'];
    let user: IUser = this.userService.getCurrentUser();
    this.userId = user.id;
    this.userService.getUserFriends(this.userId).subscribe((res: any) => {
      let friends: IUser[] = res.users;
      for (const [index, friend] of friends.entries()) {
        let element: FriendsElement = {
          position: index + 1,
          name: friend.name.firstName + ' ' + friend.name.lastName,
          email: friend.email,
          DateBirth: friend.dateBirth,
          id: friend.id
        };
        if (element){
          this.ELEMENT_DATA.push(element);
        }
      }
      this.dataSource = this.ELEMENT_DATA;
    })
  }

  delete(id: number) {
    //console.log(this.ELEMENT_DATA)
    console.log(id)
    this.userService.deleteFriend(this.userId, id).subscribe((isSuccess) => {
      if (isSuccess){
        this.displayPage();
        location.reload();
      }
    });
  }

  searchUser() {
    if (this.email && this.email !== ''){
      this.userService.addFriend(this.userId, this.email).subscribe((isSuccess)=> {
        if (isSuccess){
          this.displayPage();
          location.reload();
        }
        this.email = ''
      })
    }
  }
}
