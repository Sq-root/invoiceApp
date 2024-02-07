import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private _http: HttpClient) {}


  readConfigDetails() {
    return this._http
      .get('../../../assets/config.json')
      .pipe(map((res: any) => res));
  }

}
