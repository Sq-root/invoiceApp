import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit {
  userLoginForm: FormGroup;
  constructor() {}

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
    }
  }
}
