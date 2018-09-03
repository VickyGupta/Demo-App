import { Directive } from '@angular/core';
import { HomeService } from './home.service';

@Directive({
    selector: '[appHome]'
})
export class HomeDirective {

    constructor(public homeService: HomeService) { }

    getClientList(fn: (isSuccess: boolean, clients: any) => void) {
        this.homeService.getClientList().subscribe(
            (res) => {
                fn(true, res);
            },
            (error) => {
                fn(false, error);
            }
        );
    }

    getUserList(profileId, fn: (isSuccess: boolean, users: any) => void) {
        this.homeService.getUserList(profileId).subscribe(
            (res) => {
                fn(true, res);
            },
            (error) => {
                fn(false, error);
            }
        );
    }

    getFormList(profileId, formFields, fn: (isSuccess: boolean, forms: any) => void) {
        this.homeService.getFormList(profileId, formFields).subscribe(
            (res) => {
                fn(true, res);
            },
            (error) => {
                fn(false, error);
            }
        );
    }

    getToken(fn: (isSuccess: boolean, token: any) => void) {
        this.homeService.getToken().subscribe(
            (res) => {
                console.log(res);
                fn(true, res);
            },
            (error) => {
                console.log(error);
                fn(false, error);
            }
        );
    }

    getFormDetailById(profileId, formId, fn: (isSuccess: boolean, token: any) => void) {
        this.homeService.getFormDetailById(profileId, formId).subscribe(
            (res) => {
                fn(true, res);
            },
            (error) => {
                fn(false, error);
            }
        );
    }

    getFormDetail(profileId, formId, elementList, token, fn: (isSuccess: boolean, token: any) => void) {
        this.homeService.getFormDetail(profileId, formId, elementList, token).subscribe(
            (res) => {
                fn(true, res);
            },
            (error) => {
                fn(false, error);
            }
        );
    }

    getFormElementListByFormId(profileId, formId, token, elementFields, fn: (isSuccess: boolean, token: any) => void) {
        this.homeService.getFormElementListByFormId(profileId, formId, token, elementFields).subscribe(
            (res) => {
                fn(true, res);
            },
            (error) => {
                fn(false, error);
            }
        );
    }

    getFormRecordList(profileId, formId, token, elementFields, fn: (isSuccess: boolean, token: any) => void) {
        this.homeService.getFormRecordList(profileId, formId, token, elementFields).subscribe(
            (res) => {
                fn(true, res);
            },
            (error) => {
                fn(false, error);
            }
        );
    }

    getFormElementByFormIdAndElementId(profileId, formId, elementId, fn: (isSuccess: boolean, token: any) => void) {
        this.homeService.getFormElementByFormIdAndElementId(profileId, formId, elementId).subscribe(
            (res) => {
                fn(true, res);
            },
            (error) => {
                fn(false, error);
            }
        );
    }

}
