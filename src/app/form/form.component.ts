import { Component, OnInit } from '@angular/core';
import { HomeDirective } from '../home/home.directive';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { FormFields } from './formFields';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(public homeDirective: HomeDirective, public formRouter: Router) { }

  private formListData: any;
  private profileId: any;

  displayedColumns = [
    'select',
    'ID',
    'Form Label',
    'Table Name',
    'Last Record Modified Date'
    // 'Last Record Modified Location',
    // 'Data Record Count'
  ];

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
      this.getFormList(this.profileId, FormFields, (formList) => {
        this.formListData = formList;
        this.dataSource = new MatTableDataSource(this.formListData);
      });
    }
  }

  masterToggle(row) {
    this.formRouter.navigate(['/formDetail', this.profileId, row.id]);
  }

  getFormList(profileId, formFields, fn: (formList: any) => void) {
    this.homeDirective.getFormList(profileId, formFields, (isSuccess, formList) => {
      if (isSuccess) {
        fn(formList);
      } else {
        if (formList.status === 401) {
          this.formRouter.navigate(['/token']);
        } else {
          // TODO
        }
      }
    });
  }
}
