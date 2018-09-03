import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';




@Injectable()
export class HomeService implements OnInit {

  constructor(private http: Http, private sharedService: SharedService) { }

  public token = localStorage.getItem('token'); // this.sharedService.getToken();

  private headers = new Headers(
    { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + this.token
  });
  private options = new RequestOptions({ headers: this.headers });

  ngOnInit() {
    console.log('token');
    console.log(this.token);
  }

  public getClientList() {
      return this.http.get('/api/profiles?fields=&limit=100&offset=0', this.options).pipe(map(res => res.json()));
      // return this.http.get('/profiles/441459/users/53889232', this.options).pipe(map(res => res.json()));
  }

  public getUserList(profileId) {
    return this.http.get('/api/profiles/' + profileId + '/users?fields=&limit=100&offset=0', this.options).pipe(map(res => res.json()));
  }

  public getFormList(profileId, formFields) {
    return this.http.get('/api/profiles/' + profileId + '/pages?fields=' + formFields + '&limit=100&offset=0', this.options).pipe(map(res => res.json()));
  }

  public getToken() {
    return this.http.get('/api/token', this.options).pipe(map(res => res.json()));
  }

  public getFormDetailById(profileId, formId) {
    return this.http.get('/api/profiles/' + profileId + '/pages/' + formId, this.options).pipe(map(res => res.json()));
  }

  public getFormElementListByFormId(profileId, formId, token, elementFields) {
    localStorage.setItem('token', token);
    this.token = token;
    this.headers.set('Authorization' , 'Bearer ' + token);
    return this.http.get('/api/profiles/' + profileId + '/pages/' + formId + '/elements?fields=' + elementFields , this.options).pipe(map(res => res.json()));
  }

  public getFormElementByFormIdAndElementId(profileId, formId, elementId) {
    return this.http.get('/api/profiles/' + profileId + '/pages/' + formId + '/elements/' + elementId, this.options).pipe(map(res => res.json()));
  }

  public getFormDetail(profileId, formId, elementlist, token) {
    localStorage.setItem('token', token);
    this.headers.set('Authorization' , 'Bearer ' + token);
    return this.http.get('/api/profiles/' + profileId + '/pages/' + formId + '/records?fields=' + elementlist, this.options).pipe(map(res => res.json()));
  }

  public getFormRecordList(profileId, formId, token, elementFields) {
    localStorage.setItem('token', token);
    this.token = token;
    this.headers.set('Authorization' , 'Bearer ' + token);
    return this.http.get('/api/profiles/' + profileId + '/pages/' + formId + '/records?fields=' + elementFields , this.options).pipe(map(res => res.json()));
  }

  // https://servername.iformbuilder.com/exzact/api/v60/profiles/profile_id/pages/page_id

}
