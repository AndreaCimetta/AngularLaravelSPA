import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserListService} from "../user-list.service";
import {User} from "../../models/userModel";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private userListService: UserListService) { }

  ngOnInit(): void {
    // console.log(this.route.getCurrentNavigation());
    // console.log(this.route.url);
    this.activatedRoute.paramMap.subscribe(params => {
      this.userListService.getUserDetail(params.get('email'))
    })
  }

}
