import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserListService} from "../user-list.service";
import {User} from "../../models/userModel";
import {tap} from "rxjs/operators";
import {PostDataService} from "../../shared/post-data.service";
import {Post} from "../../models/postModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  currentEmail: string;

  postList: Post[]=[];

  display: boolean= false;

  public editForm: FormGroup;

  currentUser: User = {
    email:'',
    first_name:'',
    last_name:'',
    birth_date:null,
    profile_image:'',
    phone:'',
    created_at:null,
    updated_at:null,
    user_enabled: true
  };

  userStatus: any[]=[];

  constructor(public route: Router,
              private activatedRoute: ActivatedRoute,
              private userListService: UserListService,
              private postDataService: PostDataService) {
    this.initForm();
  }

  ngOnInit(): void {

    this.userStatus = [
      {
        label:"Enabled",
        value: true
      },
      {
        label:"Disabled",
        value: false
      }
    ]

    this.activatedRoute.paramMap.subscribe(params => {
      this.currentEmail = params.get('email');
    });

    this.userListService.getUserDetail(this.currentEmail).subscribe( (response: User)=>{
      this.currentUser = response[0];
      this.currentUser.created_at = new Date(this.currentUser.created_at);
      this.currentUser.updated_at = new Date(this.currentUser.updated_at);

      if(this.currentUser.phone === null || this.currentUser.phone === undefined){
        this.currentUser.phone = '-';
      }
      this.postDataService.getAllUserPosts(this.currentUser.id).subscribe( (resp:Post[])=>{
        this.postList= [...resp];
      });
    });
  }

  initForm(){
    this.editForm = new FormGroup({
      status: new FormControl('',[Validators.required])
    })
  }

  confirmEdit(){
    this.currentUser.user_enabled = this.editForm.value.status;

    this.userListService.updateUser(this.currentUser).subscribe(()=>{
      console.log(" update doned ");
      this.display = false;
    },error => {
      console.log(error.message);
    });
  }

}
