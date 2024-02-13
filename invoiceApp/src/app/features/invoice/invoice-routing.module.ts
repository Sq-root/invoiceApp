import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceContainerComponent } from './invoice-container/invoice-container.component';
import { InvoicGenerateComponent } from './invoic-generate/invoic-generate.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceContainerComponent,
    children: [{ path: 'create', component: InvoicGenerateComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
