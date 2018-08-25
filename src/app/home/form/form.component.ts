import { Component, OnInit } from '@angular/core';
import { HomeDirective } from '../home.directive';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(public homeDirective: HomeDirective, public formRouter: Router) { }

  private formListData: any;
  private profileId: any;
  displayedColumns = ['select', 'id', 'name', 'permissions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    if (localStorage.hasOwnProperty('profileId')) {
      this.profileId = localStorage.getItem('profileId');
      this.getFormList(this.profileId, (formList) => {
          this.formListData = formList;
          console.log(this.formListData);
          this.dataSource = new MatTableDataSource(this.formListData);
      });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle1() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  masterToggle(row) {
    this.formRouter.navigate(['/formDetail', this.profileId, row.id]);
  }

  getFormList(profileId, fn: (formList: any) => void) {
      this.homeDirective.getFormList(profileId, (isSuccess, formList) => {
        fn(formList);
      });
  }


}
