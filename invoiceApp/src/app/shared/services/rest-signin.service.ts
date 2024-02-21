import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../model/dataModel';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestSigninService {
  constructor(private _http: HttpClient) {}

  userAuthentication(userDetails) {
    return this._http
      .post(
        GlobalConstants.baseURL + 'xaccess/api/SecureAccess/Authenticate',
        userDetails
      )
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
  errorHandler(e: any): any {
    throw new Error('Method not implemented.');
  }
}
