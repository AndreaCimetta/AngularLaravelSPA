import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../auth.service";
import {SignUpRequest} from "../../models/userModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ImageCroppedEvent, ImageCropperComponent} from "ngx-image-cropper";
import {FileUpload} from "primeng/fileupload";
import {Placeholders} from "../../shared/constant";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  public registrationForm : FormGroup;
  public errorsFields: any;
  public errorsMessage: any;

  croppedImage: any = '';
  display: boolean = false;


  public srcBlob: SafeUrl;

  currentUser: SignUpRequest = {
    email: '',
    password: '',
    password_confirmation: '',
    last_name: '',
    first_name: '',
    birth_date: null,
    phone: '',
    profile_image: ''
  }

  @ViewChild(ImageCropperComponent, {static: false}) angularCropper: ImageCropperComponent;

  currentImage: any;
  settedRange: string;

  constructor(private authService: AuthService,
              public router: Router,
              private domSanitizer: DomSanitizer,
              private fileUpload: FileUpload) {
    this.initForm();
  }

  ngOnInit(): void {
    let today = new Date();
    console.log(today.getFullYear());
    today.getFullYear()
    this.settedRange= (today.getFullYear()-80).toString()+":"+(today.getFullYear()-Placeholders.ageAdmitted).toString();
  }

  initForm(){
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      birth_date: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.pattern("^[0-9*#+]+$")]),
    });
  }

  submit(){

    this.currentUser.email = this.registrationForm.value.email;
    this.currentUser.password = this.registrationForm.value.password;
    this.currentUser.password_confirmation = this.registrationForm.value.password_confirmation;
    this.currentUser.first_name = this.registrationForm.value.first_name;
    this.currentUser.last_name = this.registrationForm.value.last_name;
    this.currentUser.birth_date = new Date(this.registrationForm.value.birth_date);
    this.currentUser.phone = this.registrationForm.value.phone;
    this.currentUser.profile_image = this.croppedImage;

    this.authService.
    registerUser(this.currentUser).subscribe(
      (message) => {
        this.handleResponse(message);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  handleResponse(message){
    this.router.navigateByUrl('/login');
  }

  handleError(error){
    this.errorsMessage = error.message;
    this.errorsFields = error.errors;
  }

  imageSrc(){
    if(this.croppedImage === ''){
      return Placeholders.src;
    }
    else{
      return this.croppedImage;
    }
  }

  myUploader($event: any) {
    console.log($event);
    this.srcBlob = $event.currentFiles[0].objectURL.changingThisBreaksApplicationSecurity;
    this.display = true;
  }


  save(){
    // this.croppedImage = this.domSanitizer.bypassSecurityTrustUrl((this.angularCropper.crop()).toString());
    this.angularCropper.crop();
    this.display = false;
  }

  cancel(){
    this.fileUpload.clear();
    this.croppedImage = '';
    this.display = false;
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64;
  }


}
