import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SignInRequest, SignUpRequest, User} from "../models/userModel";
import {tap} from "rxjs/operators";
import {StorageService} from "../shared/storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectURL:string;
  apiKey = environment.apiKey;

  constructor(private http: HttpClient,
              private storage: StorageService,
              private jwtHelper: JwtHelperService) { }

  registerUser(user: SignUpRequest){
    return this.http.post<{ message: string}>(this.apiKey+'auth/register',user);
  }

  login(user: SignInRequest){
    return this.http.post<{ access_token: string, user: Partial<User> }>(this.apiKey+'auth/login',user).pipe(tap( (response) =>{
      this.storage.set('access_token',JSON.stringify(response.access_token));
      this.storage.set('user',JSON.stringify(response.user));
    }));
  }

  public get isLoggedIn(): boolean{
    return !this.jwtHelper.isTokenExpired(this.storage.get('access_token'));
  }

  logout(){
    return this.http.post(this.apiKey+'auth/logout','').pipe(tap(()=>{
      this.storage.clear();
    }));

  }

}
