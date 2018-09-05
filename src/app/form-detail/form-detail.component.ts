import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeDirective } from '../home/home.directive';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { FormUpdateComponent } from '../form-update/form-update.component';
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
  displayedColumnsHeader = [];
  displayedColumnsData = [];
  dataSource = new MatTableDataSource();
  public formUpdateComponentObj: FormUpdateComponent;

  constructor(public formDetailRouter: Router,
              public formDetailActivatedRoute: ActivatedRoute,
              public homeDirective: HomeDirective,
              public dialog: MatDialog) {
              this.formUpdateComponentObj = new FormUpdateComponent();
  }

  ngOnInit() {
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
          this.displayedColumnsHeader = ['select'];
          this.formElementListData.forEach((element, i) => {
            console.log(typeof element.name);
            if (element.data_type !== 17) {
              this.displayedColumns.push(element.name);
              if (i < 5) {
                this.displayedColumnsHeader.push(element.name);
              }
            } else {
              // TODO
            }
          });
          // this.displayedColumns = TestFields;
          localStorage.setItem('formElementObj', JSON.stringify(this.displayedColumns));
          this.getFormRecordList(this.profileId, this.formId, this.token, this.displayedColumns, (formRecordList) => {
            // this.displayedColumnsData = this.displayedColumnsData.concat(formRecordList);
            this.dataSource = new MatTableDataSource(formRecordList);
          });
        });
      }
    });
  }

  getFormElementByFormIdAndElementIdClickHandler(row) {
    localStorage.setItem('formObj', JSON.stringify(row));
    // this.formUpdateComponentObj.getData(row);
    this.formDetailRouter.navigate(['/formUpdate']);

    // this.openDialog(row); // to show form data in modal

    // this.getFormElementByFormIdAndElementId(this.profileId, this.formId, element.id, (formElementDetail) => {
    //   this.formElementData = formElementDetail;
    //   this.openDialog(element, formElementDetail);
    // });
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

  // currently not in use
  openDialog(formElementDetail) {
    const dialogRef = this.dialog.open(FormModalComponent, {
      // height: '350px'
    });
    dialogRef.componentInstance.formElementDetailData = formElementDetail;
    // dialogRef.componentInstance.message = element.id;
    dialogRef.componentInstance.title = 'test'; // element.name;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  // currently not in use
  getFormDetailById(profileId, formId, fn: (formDetail: any) => void) {
    this.homeDirective.getFormDetailById(profileId, formId, (isSuccess, formDetail) => {
      fn(formDetail);
    });
  }

  // currently not in use
  getFormElementByFormIdAndElementId(profileId, formId, elementId, fn: (formElementDetail: any) => void) {
    this.homeDirective.getFormElementByFormIdAndElementId(profileId, formId, elementId, (isSuccess, formElementDetail) => {
      fn(formElementDetail);
    });
  }

}
