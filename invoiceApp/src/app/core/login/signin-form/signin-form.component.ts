import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { GlobalConstants,RestSigninService  } from '../../../shared/plugins';
import { ToastrService } from 'ngx-toastr';

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
    private route: Router,
    private spinner: NgxSpinnerService,
    private _msgSerivce: ToastrService
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
          this.authToken = data['userDetails']['token'];
          GlobalConstants.Token = this.authToken;
          this._cookieService.set('token', this.authToken);
          this._cookieService.set('username', userDetails['UserName']);
          this._msgSerivce.success('Successfully Logged In');
          this.route.navigateByUrl('/invoice/create');
        } else {
          this._msgSerivce.error('Invalid UserName or Password');
          console.log('Logs: ', data);
        }
      });
  }

  startLodder() {
    this.spinner.show();
  }

  hideLodder() {
    this.spinner.hide();
  }

  ngOnDestroy(): void {
    this.unsubscribeAPIEventListenerData.next(true);
    this.unsubscribeAPIEventListenerData.complete();
  }
}
