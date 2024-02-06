import { NgModule } from '@angular/core';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: SigninFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
