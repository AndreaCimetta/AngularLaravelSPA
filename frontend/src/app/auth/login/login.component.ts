import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignInRequest} from "../../models/userModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  currentUser: SignInRequest = {
    email:'',
    password:''
  };

  public error = null;

  constructor(private router: Router, private authService: AuthService) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): void{
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  submit(){

    this.currentUser.email = this.loginForm.value.email;
    this.currentUser.password = this.loginForm.value.password;

    this.authService.login(this.currentUser).subscribe(
      (data) => {
        this.handleResponse(data);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleResponse(data){
    // this.tokeService.handle(data.access_token);
    // this.auth.changeAuthStatus(true); // set value for navbar
    this.router.navigateByUrl('/dashboard');
    // this.router.navigate(['/']);
  }

  handleError(error){
    // this.spinnerService.hide();
    // this._submitted = false;

    // Validation error
    this.error = error.message;
  }

}
