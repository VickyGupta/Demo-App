import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDirective } from './home.directive';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  private clientListData: any;
  private tokenObj: any;

  constructor(public homeDirective: HomeDirective, public homeRouter: Router) { }

  displayedColumns = ['select', 'id', 'name'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    // this.getToken((token) => {
    //     this.tokenObj = token;
    //     if (this.tokenObj.hasOwnProperty('user')) {
    //       localStorage.setItem('user', JSON.stringify(this.tokenObj));
    //       localStorage.setItem('profileId', this.tokenObj.user.profile_id);
    //     }
    // });
    localStorage.setItem('profileId', '441459');
    this.getClientList((clientList) => {
        this.clientListData = clientList;
        this.dataSource = new MatTableDataSource(this.clientListData);
    });
  }

  masterToggle(row) {
    console.log(row);
    if (row.hasOwnProperty('id')) {
      localStorage.setItem('profileId', row.id);
    }
  }

  getClientList(fn: (clientList: any) => void) {
      this.homeDirective.getClientList((isSuccess, clientList) => {
        if (isSuccess) {
          fn(clientList);
        } else {
          if (clientList.status === 401) {
            this.homeRouter.navigate(['/token']);
          } else {
            // TODO
          }
        }
      });
  }

  // Currently not in use
  getToken(fn: (token: any) => void) {
    this.homeDirective.getToken((isSuccess, token) => {
      if (isSuccess) {
        fn(token);
      } else {
        if (token.status === 401) {
          this.homeRouter.navigate(['/token']);
        } else {
          // TODO
        }
      }
    });
  }
}
