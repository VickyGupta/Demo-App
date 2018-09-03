import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDirective } from '../home/home.directive';
import * as _ from 'lodash';
import { FormControl, FormBuilder, FormGroup, FormGroupDirective, NgForm, FormArray, Validators } from '@angular/forms';
import { ElementFields} from '../form-detail/elementFields';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  refreshTokenForm: FormGroup;
  step = 0;
  // generateForm: FormGroup;
  // formElementListData: any;
  // formElementList: any = [];
  // formRecordList: any = [];
  // formObject: any;

  constructor(public homeBuilder: FormBuilder, public tokenRouter: Router, public homeDirective: HomeDirective, public sharedService: SharedService) {

    this.refreshTokenForm = homeBuilder.group({
      token: ['', [
        Validators.required
      ]]
    });

    // this.generateForm = homeBuilder.group({
    //   token: ['', [
    //     Validators.required
    //   ]],
    //   profileId: ['441459', [
    //     Validators.required
    //   ]],
    //   formId: ['', [
    //     Validators.required
    //   ]]
    // });

  }

  ngOnInit() {
  }

  refreshTokenClickHandler() {
    console.log(this.refreshTokenForm.valid);
    if (this.refreshTokenForm.valid) {
      this.sharedService.saveToken(this.refreshTokenForm.value.token);
      localStorage.setItem('token', this.refreshTokenForm.value.token);
      this.tokenRouter.navigate(['/home']);
    } else {
      // TODO
    }
  }

  // getFormElementListByFormId(profileId, formId, token, elementFields, fn: (formElementList: any) => void) {
  //   this.homeDirective.getFormElementListByFormId(profileId, formId, token, elementFields, (isSuccess, formElementList) => {
  //     fn(formElementList);
  //   });
  // }

  // getFormDetail(profileId, formId, token, elementFields, fn: (formElementList: any) => void) {
  //   this.homeDirective.getFormElementListByFormId(profileId, formId, token, elementFields, (isSuccess, formElementList) => {
  //     fn(formElementList);
  //   });
  // }

  // generateFormClickHandler(profileId, formId) {
  //   if (this.generateForm.valid) {
  //     this.getFormElementListByFormId(this.generateForm.value.profileId, this.generateForm.value.formId, this.generateForm.value.token, ElementFields, (formElementList) => {
  //       this.formElementList = [];
  //       this.formElementListData = formElementList;
  //       this.formElementListData.forEach(element => {
  //         if (element.name !== 'test_label') {
  //           this.formElementList.push(element.name);
  //         }
  //       });
  //       this.homeDirective.getFormDetail(this.generateForm.value.profileId, this.generateForm.value.formId, this.formElementList, this.generateForm.value.token, (isSuccess, formRecordList) => {
  //         console.log('formRecordList');
  //         console.log(formRecordList);
  //         this.formRecordList = formRecordList;

  //       });
  //     });
  //   } else {
  //     console.log('Failed to set refresh token to localStorage');
  //   }
  // }

}
