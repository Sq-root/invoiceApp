import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { RESTintercepterInterceptor } from './shared/helper/restintercepter.interceptor';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    ToastModule,
    HttpClientModule,
    RouterModule,
    NgxSpinnerModule,
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
