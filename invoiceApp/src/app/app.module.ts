import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { RESTintercepterInterceptor } from './shared/helper/restintercepter.interceptor';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    RouterModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      maxOpened: 4,
      preventDuplicates: false,
      newestOnTop: true,
      disableTimeOut: false,
      tapToDismiss: true,
      timeOut: 3000,
      extendedTimeOut: 1000,
      closeButton: true,
      // iconClasses: {
      //   error: 'toast-error',
      //   info: 'toast-info',
      //   success: 'toast-success',
      //   warning: 'toast-warn',
      //   test: 'toast-test',
      // },
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RESTintercepterInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
