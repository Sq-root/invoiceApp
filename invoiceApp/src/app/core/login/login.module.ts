import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [SigninFormComponent],
  imports: [CommonModule, LoginRoutingModule],
})
export class LoginModule {}
