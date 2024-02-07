import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule,
  ],
})
export class LoginModule {}
