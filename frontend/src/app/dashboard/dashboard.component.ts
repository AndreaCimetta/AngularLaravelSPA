import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../models/userModel";
import {UserListService} from "../userlist/user-list.service";
import {graphicDataRequest, graphicDateArray, Post} from "../models/postModel";
import {PostDataService} from "../shared/post-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UIChart} from "primeng/chart";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  basicData: any;

  basicOptions: any;

  public searchUserForm : FormGroup;

  userList: User[]=[];
  selectedUser: Partial<User>;

  usersCompared: any[]=[];

  currentRequestGraphic: graphicDataRequest = {
    user_id: 1,
    year: new Date().getFullYear()
  }

  currentGraphic: graphicDateArray[] = [
    {
      "month" : 1,
      "value" : 0,
    },
    {
      "month" : 2,
      "value" : 0,
    },
    {
      "month" : 3,
      "value" : 0,
    },
    {
      "month" : 4,
      "value" : 0,
    },
    {
      "month" : 5,
      "value" : 0,
    },
    {
      "month" : 6,
      "value" : 0,
    },
    {
      "month" : 7,
      "value" : 0,
    },
    {
      "month" : 8,
      "value" : 0,
    },
    {
      "month" : 9,
      "value" : 0,
    },
    {
      "month" : 10,
      "value" : 0,
    },
    {
      "month" : 11,
      "value" : 0,
    },
    {
      "month" : 12,
      "value" : 0,
    },
  ]

  dataRequestFirstUser: number[] = [];
  dataRequestSecondUser: number[] = [];



  @ViewChild(UIChart) chart: UIChart;
  constructor(public route: Router,
              private postDataService: PostDataService,
              private userDataService: UserListService) {
    this.initForm()
  }

  ngOnInit() {
    this.selectedUser = {id:null , first_name: "" , profile_image: ""};


    this.searchUserForm.patchValue({
      "query": '',
      "year": 2021
    })




      this.basicData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: []
      };



    this.basicOptions = {
      legend: {
        labels: {
          fontColor: '#495057'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }]
      }
    };



  }


  searchUsers(){
      this.userDataService.searchUser(this.searchUserForm.value.query).subscribe( (response: User[])=>{
        this.userList = [...response];
      });

  }

  initForm(){
    this.searchUserForm = new FormGroup({
      query: new FormControl('', [Validators.required]),
      year: new FormControl( 2021, [Validators.required]),
    });

  }

  private mapDatas(graphic: graphicDateArray[], newArray: number[]) {
    graphic.forEach((item)=>{
      newArray.push(item.value);
      item.value= 0;
    })

  }



  searchAnalythics(){
  this.postDataService.getAllAuthorPostByYear({"user_id": this.selectedUser.id, "year": this.searchUserForm.value.year}).subscribe( (response: Post[])=>{
  response.forEach((post)=>{
      this.currentGraphic = this.currentGraphic.map((item) =>{
        if(item.month == new Date(post.created_at).getMonth()+1){
          item.value ++;
        }
        return item;
      })
      console.log(this.currentGraphic);

    })
    if(this.dataRequestFirstUser.length == 0){
      this.mapDatas(this.currentGraphic, this.dataRequestFirstUser);
      this.basicData.datasets.push(
        {
          label: this.selectedUser.first_name+" "+this.searchUserForm.value.year.toString(),
          backgroundColor: '#e23237',
          data: this.dataRequestFirstUser
        }
      )

    }
    else if(this.dataRequestSecondUser.length == 0){
      this.mapDatas(this.currentGraphic, this.dataRequestSecondUser);
      this.basicData.datasets.push(
        {
          label: this.selectedUser.first_name+" "+this.searchUserForm.value.year.toString(),
          backgroundColor: '#003b8f',
          data: this.dataRequestSecondUser
        }
      )
    }

    let obj: any = {...this.selectedUser, ...{year:this.searchUserForm.value.year.toString()}}
    this.usersCompared.push(obj);
    this.chart.reinit();
    }
  )}

  setSelectedUser( selected :Partial<User> ){
    this.selectedUser = selected;
  }

  deleteElement(){
    let arr: number[]=[];
    if(this.basicData.datasets.length == 2){
      this.dataRequestSecondUser = arr;
    }
    else {
     this.dataRequestFirstUser = arr;
    }
    this.basicData.datasets.pop();
    this.usersCompared.pop();
    this.chart.reinit();
  }

}
