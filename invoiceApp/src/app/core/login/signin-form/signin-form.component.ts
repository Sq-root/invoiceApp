import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/model/dataModel';
import { RestSigninService } from 'src/app/shared/services/rest-signin.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit, OnDestroy {
  userLoginForm: FormGroup;
  authToken: string = '';

  private unsubscribeAPIEventListenerData: Subject<Boolean> =
    new Subject<Boolean>();
  constructor(
    private _loginService: RestSigninService,
    private _cookieService: CookieService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getInitalizeForm();
  }

  //Get Initalize Form
  getInitalizeForm() {
    //User Login Form
    this.userLoginForm = new FormGroup({
      UserName: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[^\s]+.*$/),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  doLogin() {
    this.userLoginForm.markAllAsTouched();
    if (this.userLoginForm.valid) {
      console.log('Form: ', this.userLoginForm.value);
      this.doUserAuthentication(this.userLoginForm.value);
    }
  }

  doUserAuthentication(userDetails) {
    let payload = {
      userName: userDetails['UserName'],
      password: userDetails['password'],
    };

    this._loginService
      .userAuthentication(payload)
      .pipe(takeUntil(this.unsubscribeAPIEventListenerData))
      .subscribe((data) => {
        //For Success
        if (data && data['userDetails']) {
          //Toast Msg Success
          this.authToken = data['userDetails']['token'];
          GlobalConstants.Token = this.authToken;
          console.log('Token: ', this.authToken);
          this._cookieService.set('token', this.authToken);
          this._cookieService.set('username', userDetails['UserName']);
          this.route.navigateByUrl('/invoice');
        } else if (data && data['failedResponse']) {
          //Toast Msg Error
        } else {
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAPIEventListenerData.next(true);
    this.unsubscribeAPIEventListenerData.complete();
  }
}
