import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/userModel";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  apiKey= environment.apiKey
  constructor(private http: HttpClient) { }

  getAllUser(){
    return this.http.get<User[]>(this.apiKey+'users/get-users');
  }

  getUserById(id: number){
    return this.http.get<User>(this.apiKey+'users/get-user-byid/'+id);
  }

  getUserDetail(email: string){
    return this.http.get<User>(this.apiKey+'users/get-user/'+email);
  }

  searchUser(value: string){
    return this.http.get<User[]>(this.apiKey+'users/search-user/'+value);
  }

  updateUser( currentUser: User ){
    return this.http.put(this.apiKey+'users/update-user/'+currentUser.id, currentUser )
  }

  deleteUser(id: number){
    return this.http.delete(this.apiKey+'auth/delete-user/'+id);
  }
}
