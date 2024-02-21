import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../model/dataModel';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestSigninService {
  constructor(private _http: HttpClient) {}

  //Method : user authentication service
  userAuthentication(userDetails) {
    return this._http
      .post(GlobalConstants.baseURL + 'api/v1/login', userDetails)
      .pipe(
        map((response) => {
          if (response && response['sucessResponse']) {
            if (response['sucessResponse']['status'] === 200) {
              let result = response['sucessResponse']['data']['userDetails'];
              return result;
            }
          } else if (response && response['failedResponse']) {
            return response;
          }
          return response;
        }),
        catchError((e) => throwError(this.errorHandler(e)))
      );
  }

  //Method: Get All PRoducts
  getproductdetails(productName?:string) {
    return this._http
      .get(GlobalConstants.baseURL + '/api/v1/item?itemName=' + productName)
      .pipe(
        map((response) => {
          if (response && response['sucessResponse']) {
            if (response['sucessResponse']['status'] === 200) {
              let result = response['sucessResponse']['data'];
              return result;
            }
          } else if (response && response['failedResponse']) {
            return response;
          }
          return response;
        }),
        catchError((e) => throwError(this.errorHandler(e)))
      );
  }
  errorHandler(e: any): any {
    throw new Error('Method not implemented.');
  }
}
