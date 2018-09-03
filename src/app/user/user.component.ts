import { Component, OnInit } from '@angular/core';
import { HomeDirective } from '../home/home.directive';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public homeDirective: HomeDirective) { }

  private userListData: any;
  private user: any;
  private profileId: any;


  displayedColumns = ['id', 'username'];
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    if (localStorage.hasOwnProperty('profileId')) {
      // this.user = JSON.parse(localStorage.getItem('user'));
      this.profileId = localStorage.getItem('profileId');
      this.getUserList(this.profileId, (userList) => {
          this.userListData = userList;
          console.log(this.userListData);
          this.dataSource = new MatTableDataSource(this.userListData);
      });
    }
  }

  getUserList(profileId, fn: (userList: any) => void) {
      this.homeDirective.getUserList(profileId, (isSuccess, userList) => {
        fn(userList);
      });
  }
}
