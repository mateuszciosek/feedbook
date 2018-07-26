import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  private dataUrl = environment.apiUrl + 'posts/';

  constructor(private http: HttpClient) { }

  getAll(dataUrl) {
    return this.http.get(dataUrl)
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error.error)
      });
  }

  getDetails(dataUrl, extract) {
    return this.http.get(dataUrl + extract + '/');
  }

  create(data) {
    return this.http.post(this.dataUrl, data)
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error.error)
      });
  }

  update(dataUrl, data) {
    return this.http.put(dataUrl, data)
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error.error)
      })
  }

  delete(extract) {
    return this.http.delete(this.dataUrl + extract + '/')
      .toPromise()
      .then(() => null)
  }

}
