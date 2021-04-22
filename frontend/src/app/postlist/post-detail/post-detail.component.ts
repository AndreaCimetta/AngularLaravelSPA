import { Component, OnInit } from '@angular/core';
import {PostDataService} from "../../shared/post-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../models/postModel";
import {UserListService} from "../../userlist/user-list.service";
import {User} from "../../models/userModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  currentId: number;
  currentUser: User;
  currentPost: Post;

  display : boolean = false;

  public editForm: FormGroup;

  constructor(private postDataService: PostDataService,
              private userDataservice: UserListService,
              private activatedRoute: ActivatedRoute,
              public route: Router  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.currentId = parseInt(params.get('id'));
    });

    this.postDataService.getPostById(this.currentId).subscribe((response: Post)=>{
      this.currentPost = response[0];
      console.log(this.currentPost);
      if(this.currentPost != undefined){
        this.userDataservice.getUserById(this.currentPost.user_id).subscribe((resp:User)=>{
          this.currentUser = resp[0];
        })
      }
    });

  }


  initForm(){
    this.editForm = new FormGroup({
      status: new FormControl('',[Validators.required])
    })
  }


  confirmEdit(){
    this.currentPost.status = this.editForm.value.status;

    this.postDataService.updatePost(this.currentPost).subscribe(()=>{
      console.log(" update doned ");
      this.display = false;
    },error => {
      console.log(error.message);
    });
  }
}
