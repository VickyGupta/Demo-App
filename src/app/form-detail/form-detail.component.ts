import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeDirective } from '../home/home.directive';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { ElementFields } from './elementFields';
import { TestFields } from './elementFields';


@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css'],
  entryComponents: [FormModalComponent]
})
export class FormDetailComponent implements OnInit {

  private profileId: any;
  private formId: any;
  private elementId: any;
  private formDetailData: any;
  private formElementListData: any;
  private formElementData: any;
  public token =   localStorage.getItem('token');
  displayedColumns = [];
  displayedColumns1 = [];
  displayedColumns2 = [];
  dataSource = new MatTableDataSource();
  test = [];
  test1 = [];

  constructor(public formDetailRouter: Router, public formDetailActivatedRoute: ActivatedRoute, public homeDirective: HomeDirective, public dialog: MatDialog) { }

  getKeys = Object.keys;
  getValues = Object.values;

  ngOnInit() {
    this.test = ElementFields;
    this.formDetailActivatedRoute.params.subscribe(params => {
      if (params.hasOwnProperty('pId') && params.hasOwnProperty('fId') && params['fId'] != null && params['pId'] != null) {
        this.profileId = params['pId'];
        this.formId = params['fId'];
        // this.getFormDetailById(this.profileId, this.formId, (formDetail) => {
        //   this.formDetailData = formDetail;
        // });
        this.getFormElementListByFormId(this.profileId, this.formId, this.token, ElementFields, (formElementList) => {
          this.formElementListData = formElementList;
          this.displayedColumns = [];
          this.displayedColumns1 = ['select'];
          this.formElementListData.forEach(element => {
            console.log(typeof element.name);
            if (element.data_type !== 17) {
              console.log('in');
              this.displayedColumns1.push(element.name);
              this.displayedColumns.push(element.name);
            } else {
              console.log('out');
            }
          });
          // this.displayedColumns = TestFields;
          this.getFormRecordList(this.profileId, this.formId, this.token, this.displayedColumns, (formRecordList) => {
            this.displayedColumns2 = this.displayedColumns2.concat(formRecordList);
            this.dataSource = new MatTableDataSource(formRecordList);
          });
        });
      }
    });
  }

  masterToggle(row) {
    console.log(row);
    // this.formRouter.navigate(['/formDetail', this.profileId, row.id]);
  }

  getFormElementByFormIdAndElementIdClickHandler(row) {
    console.log(row);
    this.openDialog(row);
    // this.getFormElementByFormIdAndElementId(this.profileId, this.formId, element.id, (formElementDetail) => {
    //   this.formElementData = formElementDetail;
    //   this.openDialog(element, formElementDetail);
    // });
  }

  openDialog(formElementDetail) {
    const dialogRef = this.dialog.open(FormModalComponent, {
      // height: '350px'
    });
    dialogRef.componentInstance.formElementDetailData = formElementDetail;
    // dialogRef.componentInstance.message = element.id;
    dialogRef.componentInstance.title = 'test'; // element.name;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getFormDetailById(profileId, formId, fn: (formDetail: any) => void) {
    this.homeDirective.getFormDetailById(profileId, formId, (isSuccess, formDetail) => {
      fn(formDetail);
    });
  }

  getFormElementListByFormId(profileId, formId, token, elementFields, fn: (formElementList: any) => void) {
    this.homeDirective.getFormElementListByFormId(profileId, formId, this.token, elementFields, (isSuccess, formElementList) => {
      fn(formElementList);
    });
  }

  getFormRecordList(profileId, formId, token, elementFields, fn: (formElementList: any) => void) {
    this.homeDirective.getFormRecordList(profileId, formId, this.token, elementFields, (isSuccess, formElementList) => {
      fn(formElementList);
    });
  }

  getFormElementByFormIdAndElementId(profileId, formId, elementId, fn: (formElementDetail: any) => void) {
    this.homeDirective.getFormElementByFormIdAndElementId(profileId, formId, elementId, (isSuccess, formElementDetail) => {
      fn(formElementDetail);
    });
  }

}
