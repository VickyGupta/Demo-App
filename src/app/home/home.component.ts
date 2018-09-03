import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDirective } from './home.directive';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

const ELEMENT_DATA_TYPE: any[] = [
  {data_type: 1, name: 'Text', type: 'text'},
  {data_type: 2, name: 'Number', type: 'number'},
  {data_type: 16, name: 'Label', type: 'label'},
  {data_type: 19, name: 'Text Area', type: 'textarea'},
  {data_type: 3, name: 'Date', type: 'date'}
];

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
    this.getToken((token) => {
        this.tokenObj = token;
        if (this.tokenObj.hasOwnProperty('user')) {
          localStorage.setItem('user', JSON.stringify(this.tokenObj));
          localStorage.setItem('profileId', this.tokenObj.user.profile_id);
        }
    });
    this.getClientList((clientList) => {
        this.clientListData = clientList;
        this.dataSource = new MatTableDataSource(this.clientListData);
    });
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle1() {
    console.log(this.selection.selected);
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  masterToggle(row) {
    console.log(row);
    if (row.hasOwnProperty('id')) {
      localStorage.setItem('profileId', row.id);
    }
  }

  getClientList(fn: (clientList: any) => void) {
      this.homeDirective.getClientList((isSuccess, clientList) => {
        fn(clientList);
      });
  }

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
