import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeDirective } from '../home.directive';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { FormModalComponent } from '../form-modal/form-modal.component';


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

  constructor(public formDetailRouter: Router, public formDetailActivatedRoute: ActivatedRoute, public homeDirective: HomeDirective, public dialog: MatDialog) { }

  ngOnInit() {
    this.formDetailActivatedRoute.params.subscribe(params => {
      if (params.hasOwnProperty('pId') && params.hasOwnProperty('fId') && params['fId'] != null && params['pId'] != null) {
        this.profileId = params['pId'];
        this.formId = params['fId'];
        this.getFormDetailById(this.profileId, this.formId, (formDetail) => {
          this.formDetailData = formDetail;
        });

        this.getFormElementListByFormId(this.profileId, this.formId, this.token, (formElementList) => {
          this.formElementListData = formElementList;
        });
      }
    });
  }

  getFormElementByFormIdAndElementIdClickHandler(element) {
    this.getFormElementByFormIdAndElementId(this.profileId, this.formId, element.id, (formElementDetail) => {
      this.formElementData = formElementDetail;
      this.openDialog(element, formElementDetail);
    });
  }

  openDialog(element, formElementDetail) {
    const dialogRef = this.dialog.open(FormModalComponent, {
      // height: '350px'
    });
    dialogRef.componentInstance.formElementDetailData = formElementDetail;
    dialogRef.componentInstance.message = element.id;
    dialogRef.componentInstance.title = element.name;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getFormDetailById(profileId, formId, fn: (formDetail: any) => void) {
    this.homeDirective.getFormDetailById(profileId, formId, (isSuccess, formDetail) => {
      fn(formDetail);
    });
  }

  getFormElementListByFormId(profileId, formId, token, fn: (formElementList: any) => void) {
    this.homeDirective.getFormElementListByFormId(profileId, formId, this.token, (isSuccess, formElementList) => {
      fn(formElementList);
    });
  }

  getFormElementByFormIdAndElementId(profileId, formId, elementId, fn: (formElementDetail: any) => void) {
    this.homeDirective.getFormElementByFormIdAndElementId(profileId, formId, elementId, (isSuccess, formElementDetail) => {
      fn(formElementDetail);
    });
  }

}
