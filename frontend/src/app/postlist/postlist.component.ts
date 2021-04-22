import { Component, OnInit } from '@angular/core';
import {PostDataService} from "../shared/post-data.service";
import {Post} from "../models/postModel";
import {UserListService} from "../userlist/user-list.service";
import {User} from "../models/userModel";
import {element} from "protractor";
import {Router} from "@angular/router";

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  postList: Post[] = [];
  userList: User[] = [];

  constructor(private postDataService: PostDataService,
              private userDataService: UserListService,
              public route: Router) { }

  ngOnInit(): void {

    this.postDataService.getAllposts().subscribe( (response:Post[])=>{
      this.postList = [...response];
      this.userDataService.getAllUser().subscribe( (resp:User[])=>{
        this.userList = [...resp];
      });
    });
  }

  findAuthor(id: number){
    return this.userList[this.userList.findIndex(x => x.id ===id)];
  }

}
