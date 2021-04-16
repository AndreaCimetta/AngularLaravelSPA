import { Component, OnInit } from '@angular/core';
import {User} from "../models/userModel";
import {Router} from "@angular/router";
import {UserListService} from "./user-list.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  userList: User[]=[];
  loggedUser: Partial<User>;
  public menuToggle :MenuItem[]=[];

  constructor(public route: Router,
              private userListService: UserListService) { }

  ngOnInit(): void {



    this.menuToggle = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        items: [
          {label: 'Edit', icon: 'pi pi-fw pi-user-edit'},
          {label: 'Delete', icon: 'pi pi-fw pi-trash'}
        ]
      }
    ];








    this.userListService.getAllUser().subscribe((response: User[])=>{
      this.userList=[...response];
      this.userList.forEach(x =>  {
        x.created_at = new Date(x.created_at);
        x.updated_at = new Date(x.updated_at);
      });
    }, error => {
      console.log(error);
    });

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.loggedUser.email);
  }


  onClick(event){
    event.stopPropagation();
  }


  deleteUser(id:number,event){
    event.stopPropagation();
    this.userListService.deleteUser(id).subscribe(()=>{
      window.location.reload();
    });
  }

}
