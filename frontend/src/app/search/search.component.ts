import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../models/postModel";
import {User} from "../models/userModel";
import {PostDataService} from "../shared/post-data.service";
import {UserListService} from "../userlist/user-list.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchForm: FormGroup;

  chooseType : string[]= [
    "Post","User"
  ]

  postList: Post[]=[];

  userList: User[]=[];

  constructor(private postDataService: PostDataService,
              private userDataService: UserListService,
              public route: Router) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(){
    this.searchForm = new FormGroup({
      query: new FormControl('',[Validators.required]),
      type: new FormControl(this.chooseType[0]),
    });
  }

  search(){
    if(this.searchForm.value.type === this.chooseType[0]){
      this.postDataService.searchPost(this.searchForm.value.query).subscribe( (response: Post[])=>{
        this.postList = [...response];
      });
    }
    else{
      this.userDataService.searchUser(this.searchForm.value.query).subscribe( (resp: User[])=>{
        this.userList = [...resp];
      })
    }
  }

}
