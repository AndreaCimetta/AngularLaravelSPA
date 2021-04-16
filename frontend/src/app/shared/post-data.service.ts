import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Post} from "../models/postModel";

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  apiKey= environment.apiKey

  constructor(private http: HttpClient) { }

  getAllposts(){
    return this.http.get<Post[]>(this.apiKey+'posts/get-posts');
  }

  getAllUserPosts(id: number){
    return this.http.get<Post[]>(this.apiKey+'posts/get-user-posts/'+id);
  }


}
