import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceContainerComponent } from './invoice-container/invoice-container.component';
import { InvoicGenerateComponent } from './invoic-generate/invoic-generate.component';
import { AddNewproductComponent } from './add-newproduct/add-newproduct.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceContainerComponent,
    children: [
      { path: '', redirectTo: 'create', pathMatch: 'full' },
      { path: 'create', component: InvoicGenerateComponent },
      { path: 'addproduct', component: AddNewproductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
