import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDirective } from '../home.directive';
import * as _ from 'lodash';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  refreshTokenForm: FormGroup;
  generateForm: FormGroup;
  formElementListData: any;
  formElementList: any = [];
  formObject: any;

  constructor(public homeBuilder: FormBuilder, public tokenRouter: Router, public homeDirective: HomeDirective) {

    this.refreshTokenForm = homeBuilder.group({
      token: ['', [
        Validators.required
      ]]
    });

    this.generateForm = homeBuilder.group({
      token: ['', [
        Validators.required
      ]],
      profileId: ['441459', [
        Validators.required
      ]],
      formId: ['', [
        Validators.required
      ]]
    });

  }

  ngOnInit() {
  }

  refreshTokenClickHandler() {
    if (this.refreshTokenForm.valid) {
      console.log('Successfully set refresh token to localStorage');
      localStorage.setItem('token', this.refreshTokenForm.value.token);
      // this.tokenRouter.navigate(['/home']);
      console.log(this.refreshTokenForm.value);
    } else {
      console.log('Failed to set refresh token to localStorage');
    }
  }

  getFormElementListByFormId(profileId, formId, token, fn: (formElementList: any) => void) {
    this.homeDirective.getFormElementListByFormId(profileId, formId, token, (isSuccess, formElementList) => {
      fn(formElementList);
    });
  }

  getFormDetail(profileId, formId, token, fn: (formElementList: any) => void) {
    this.homeDirective.getFormElementListByFormId(profileId, formId, token, (isSuccess, formElementList) => {
      fn(formElementList);
    });
  }

  generateFormClickHandler(profileId, formId) {
    if (this.generateForm.valid) {
      console.log(this.generateForm.value);
      // localStorage.setItem('token', this.generateForm.value.token);
      this.getFormElementListByFormId(this.generateForm.value.profileId, this.generateForm.value.formId, this.generateForm.value.token, (formElementList) => {
        this.formElementList = [];
        this.formElementListData = formElementList;
        this.formElementListData.forEach(element => {
          if (element.name !== 'test_label') {
            this.formElementList.push(element.name);
          }
        });
        this.homeDirective.getFormDetail(this.generateForm.value.profileId, this.generateForm.value.formId, this.formElementList, this.generateForm.value.token, (isSuccess, token) => {
          console.log('token');
          console.log(token);
        });
      });
    } else {
      console.log('Failed to set refresh token to localStorage');
    }
  }

}
