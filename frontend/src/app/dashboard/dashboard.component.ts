import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../models/userModel";
import {UserListService} from "../userlist/user-list.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userList: User[]=[];
  loggedUser: Partial<User>;

  constructor(public route: Router,
              private userListService: UserListService) { }

  ngOnInit(): void {

  }


}
