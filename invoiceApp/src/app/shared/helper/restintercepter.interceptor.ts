import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalConstants } from '../model/dataModel';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class RESTintercepterInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const Token = GlobalConstants.Token;
    if (Token) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + Token },
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', '*'),
      });
    }

    this.spinner.show();
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinner.hide();
          }
        }
      ),
      catchError((error: any) => {
        this.spinner.hide();
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 400:
                // do Something
                break;
              // Note: As Connector Sending 200 as ERROR Code
              case 200:  
                // do Something
                break;
              ///////////////////////////////////
              case 401:
                //For Unauthorized
                // this.router.navigateByUrl('/login');
                break;
              case 404:
                // this.router.navigateByUrl('/page-not-found');
                break;
              case 500:
                // this.router.navigateByUrl('/internal-server-error');
                break;
              default:
                // do something
                // this.router.navigateByUrl('/error');
                break;
            }
          }
        } else {
          console.error('Other Errors');
        }
        return throwError(error);
      })
    );
  }
}
