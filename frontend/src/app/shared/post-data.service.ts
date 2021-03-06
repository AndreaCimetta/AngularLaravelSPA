import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {graphicDataRequest, Post} from "../models/postModel";

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

  getAllAuthorPostByYear(obj: graphicDataRequest){
    return this.http.post(this.apiKey+'posts/get-user-posts-year', obj);
  }

  getPostById(id: number){
    return this.http.get<Post>(this.apiKey+'posts/get-post/'+id);
  }

  updatePost(currentPost: Post){
    return this.http.put(this.apiKey+'posts/update-post/'+currentPost.id, currentPost);
  }

  searchPost(query: string){
    return this.http.get<Post[]>(this.apiKey+'posts/search-post/'+query);
  }
}
