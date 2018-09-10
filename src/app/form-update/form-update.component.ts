import { Component, OnInit, Input } from '@angular/core';
import { HomeDirective } from '../home/home.directive';
import { Router, ActivatedRoute } from '@angular/router';


import * as _ from 'underscore';


@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnInit {

  public formElementDetailData: any;
  public composedFormData: any = [];
  public composedKeyData: any = [];
  public testList = [];
  public formElementData: any;
  public flag: Boolean = false;
  public test: String;
  public modelPropName: any = {};
  public profileId: any;
  public formId: any;
  public recordId: any;
  constructor(public homeDirective: HomeDirective, public formUpdateRouter: Router) {
    this.composedFormData = [];
    this.composedKeyData = [];
  }

  getKeys = Object.keys;
  getValues = Object.values;
  ngOnInit() {
    if (localStorage.hasOwnProperty('formObj')) {
      this.profileId = localStorage.getItem('pId');
      this.formId = localStorage.getItem('fId');
      this.formElementDetailData = JSON.parse(localStorage.getItem('formObj'));
      this.formElementData = JSON.parse(localStorage.getItem('formElementObj'));
      this.testList.push(this.formElementDetailData);
      this.composeObjectData();
    }
  }

  public composeObjectData() {
    this.composedKeyData = Object.keys(this.formElementDetailData);
    this.composedKeyData.forEach(v => {
      if (v !== 'id') {
        this.composedFormData.push({ 'element_name': v, 'value': '' });
      }
    });
  }

  public getData(data) {
    this.flag = true;
    this.test = 'Hello';
    this.formElementDetailData = data;
  }

  public submitForm(data) {
    this.composedFormData.forEach((element, index) => {
      if (element.element_name !== 'id') {
        element.value = data.value[element.element_name];
      }
    });
    this.recordId = data.value.id;
    this.homeDirective.updateFormData(this.profileId, this.formId, this.recordId, { 'id': this.recordId, 'fields': this.composedFormData }, (isSuccess, formElementDetail) => {
      if (isSuccess) {
        this.formUpdateRouter.navigate(['/formDetail', this.profileId, this.formId]);
      } else {
        alert('Something went wrong');
      }
    });
  }

}
