import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {
  public display = false;

  constructor(private authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {

  }

  logout(){
    this.authService.logout().subscribe(()=>{
      window.location.reload();
    });

  }

}
