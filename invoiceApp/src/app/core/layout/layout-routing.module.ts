import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './master-page/master-page.component';
import { AuthenticateUserService } from 'src/app/shared/Auth/authenticate-user.guard';
const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'login', //By Default redirect to Login Page
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'invoice',
        canLoad: [AuthenticateUserService], //Check User Authentication
        loadChildren: () =>
          import('../../features/invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
