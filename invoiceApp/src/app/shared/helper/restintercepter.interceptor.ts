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
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RESTintercepterInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private _msgSerivce: ToastrService,
    private _cookieService: CookieService
  ) {
    //Check TOKEN
    if (_cookieService.check('token')) {
      GlobalConstants.Token = _cookieService.get('token');
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const Token = GlobalConstants.Token;
    if (Token) {
      console.log('Get Tkern: ', Token);
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: { token: Token },
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Credentials', 'true')
          .set(
            'Access-Control-Allow-Methods',
            'PUT, POST, GET, DELETE, PATCH, OPTIONS'
          ),
      });
    }

    this.spinner.show();
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
      catchError((error: any) => {
        this.spinner.hide();
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Error Event:', error.error);
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            if (error && error['error']) {
              this.handelError(error['error']);
            }
            switch (error.status) {
              case 400:
                // do Something
                break;
              case 401:
                this.router.navigateByUrl('/login');
                break;
              case 404:
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

  handelError(errorResponse: any) {
    if (errorResponse && errorResponse['failedResponse']) {
      console.log('Error Logs: ', errorResponse);
      let erroMsg = errorResponse['failedResponse']['error'];
      this._msgSerivce.error(erroMsg);
    }
  }
}
