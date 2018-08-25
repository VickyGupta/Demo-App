import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeDirective } from '../home.directive';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css']
})
export class FormDetailComponent implements OnInit {

  private profileId: any;
  private formId: any;
  private elementId: any;
  private formDetailData: any;
  private formElementListData: any;

  constructor(public formDetailRouter: Router, public formDetailActivatedRoute: ActivatedRoute, public homeDirective: HomeDirective) { }

  ngOnInit() {
    this.formDetailActivatedRoute.params.subscribe(params => {
      if (params.hasOwnProperty('pId') && params.hasOwnProperty('fId') && params['fId'] != null && params['pId'] != null) {
        console.log(params['pId']);
        console.log(params['fId']);
        this.profileId = params['pId'];
        this.formId = params['fId'];
        this.getFormDetailById(this.profileId, this.formId, (formDetail) => {
            this.formDetailData = formDetail;
        });

        this.getFormElementListByFormId(this.profileId, this.formId, (formElementList) => {
            this.formElementListData = formElementList;
        });
      }
    });
  }

  getFormDetailById(profileId, formId, fn: (formDetail: any) => void) {
      this.homeDirective.getFormDetailById(profileId, formId, (isSuccess, formDetail) => {
        fn(formDetail);
      });
  }

  getFormElementListByFormId(profileId, formId, fn: (formElementList: any) => void) {
      this.homeDirective.getFormElementListByFormId(profileId, formId, (isSuccess, formElementList) => {
        fn(formElementList);
      });
  }

}
