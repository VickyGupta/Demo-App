import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';


@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnInit {

  public formElementDetailData: any;
  public testList = [];
  public formElementData: any;
  public flag: Boolean = false;
  public test: String;
  public modelPropName: any = {};
  constructor() {
  }

  getKeys = Object.keys;
  getValues = Object.values;
  ngOnInit() {
    console.log('xsxsx');
    if (localStorage.hasOwnProperty('formObj')) {
      this.formElementDetailData = JSON.parse(localStorage.getItem('formObj'));
      this.formElementData = JSON.parse(localStorage.getItem('formElementObj'));
      this.testList.push(this.formElementDetailData);
      console.log(this.formElementDetailData);
    }
  }

  public getData(data) {
    console.log('formElementDetailData1');
    this.flag = true;
    this.test = 'Hello';
    this.formElementDetailData = data;
    console.log(this.formElementDetailData);
  }

  public submitForm(data) {
    console.log('asdf');
    console.log(data.value);
    console.log(this.modelPropName);
  }

}
