import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { JwtService } from '../service/jwt.service';


@Injectable()
export class HomeService {

  constructor(private http: Http, private sharedService: SharedService, private jwtService: JwtService) { }

  public token = localStorage.getItem('token'); // this.sharedService.getToken();
  public obj = 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=';

  private headers = new Headers(
    { 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + this.token
  });

  private headersForToken = new Headers(
    { 'Content-Type': 'application/x-www-form-urlencoded'
  });

  private options = new RequestOptions({ headers: this.headers });
  private optionsForToken = new RequestOptions({ headers: this.headersForToken });

  public getClientList() {
      this.token = localStorage.getItem('token');
      this.headers.set('Authorization' , 'Bearer ' + this.token);
      return this.http.get('/api/v60/profiles?fields=&limit=100&offset=0', this.options).pipe(map(res => res.json()));
      // return this.http.get('/profiles/441459/users/53889232', this.options).pipe(map(res => res.json()));
  }

  public getUserList(profileId) {
    this.token = localStorage.getItem('token');
    this.headers.set('Authorization' , 'Bearer ' + this.token);
    return this.http.get('/api/v60/profiles/' + profileId + '/users?fields=&limit=100&offset=0', this.options).pipe(map(res => res.json()));
  }

  public getFormList(profileId, formFields) {
    return this.http.get('/api/v60/profiles/' + profileId + '/pages?fields=' + formFields + '&limit=100&offset=0', this.options).pipe(map(res => res.json()));
  }

  public getToken() {
    return this.http.get('/api/v60/token', this.options).pipe(map(res => res.json()));
  }

  public getFormDetailById(profileId, formId) {
    return this.http.get('/api/v60/profiles/' + profileId + '/pages/' + formId, this.options).pipe(map(res => res.json()));
  }

  public getFormElementListByFormId(profileId, formId, token, elementFields) {
    localStorage.setItem('token', token);
    this.token = token;
    this.headers.set('Authorization' , 'Bearer ' + token);
    return this.http.get('/api/v60/profiles/' + profileId + '/pages/' + formId + '/elements?fields=' + elementFields , this.options).pipe(map(res => res.json()));
  }

  public getFormElementByFormIdAndElementId(profileId, formId, elementId) {
    return this.http.get('/api/v60/profiles/' + profileId + '/pages/' + formId + '/elements/' + elementId, this.options).pipe(map(res => res.json()));
  }

  public getFormDetail(profileId, formId, elementlist, token) {
    localStorage.setItem('token', token);
    this.headers.set('Authorization' , 'Bearer ' + token);
    return this.http.get('/api/v60/profiles/' + profileId + '/pages/' + formId + '/records?fields=' + elementlist, this.options).pipe(map(res => res.json()));
  }

  public getFormRecordList(profileId, formId, token, elementFields) {
    localStorage.setItem('token', token);
    this.token = token;
    this.headers.set('Authorization' , 'Bearer ' + token);
    return this.http.get('/api/v60/profiles/' + profileId + '/pages/' + formId + '/records?fields=' + elementFields , this.options).pipe(map(res => res.json()));
  }

  public getAccessToken(encodedToken) {
    // return this.jwtService.generateEncodedToken((encodedToken) => {
      if (encodedToken !== null) {
         this.obj = this.obj.concat(encodedToken);
         console.log(this.obj);
         // this.headers.set('Content-Type' , 'application/x-www-form-urlencoded');
         return this.http.post('/api/oauth/token', this.obj, this.optionsForToken).pipe(map(res => res.json()));
      } else {
        return this.http.post('/api/oauth/token', this.obj, this.optionsForToken).pipe(map(res => res.json()));
      }
    // });
  }

  // https://servername.iformbuilder.com/exzact/api/v60/profiles/profile_id/pages/page_id

}
