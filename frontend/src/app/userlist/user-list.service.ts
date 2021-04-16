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

  getUserById(id: string){
    return this.http.get<User>(this.apiKey+'users/get-user-byid/'+id);
  }

  getUserDetail(email: string){
    return this.http.get<User>(this.apiKey+'users/get-user/'+email);
  }

  deleteUser(id: number){
    return this.http.delete(this.apiKey+'auth/delete-user/'+id);
  }
}
