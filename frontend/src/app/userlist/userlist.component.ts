import { Component, OnInit } from '@angular/core';
import {User} from "../models/userModel";
import {Router} from "@angular/router";
import {UserListService} from "./user-list.service";
import {MenuItem} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  userList: User[]=[];
  loggedUser: Partial<User>;
  userStatus: any[]=[];


  currentId: number;
  currentUser: User;

  display : boolean = false;

  public editForm: FormGroup;

  constructor(public route: Router,
              private userListService: UserListService) {
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


    this.userListService.getAllUser().subscribe((response: User[])=>{
      this.userList=[...response];
      this.userList.forEach(x =>  {
        console.log(x.user_enabled);
        x.created_at = new Date(x.created_at);
        x.updated_at = new Date(x.updated_at);
      });
    }, error => {
      console.log(error);
    });

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.loggedUser.email);
  }



    clickTiered(event){
    event.stopPropagation();
      console.log(event)
    }


  deleteUser(id:number,event){
    event.stopPropagation();
    this.userListService.deleteUser(id).subscribe(()=>{
      window.location.reload();
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
      window.location.reload();
    },error => {
      console.log(error.message);
    });
  }

}
