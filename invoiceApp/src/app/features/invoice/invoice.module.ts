import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from '../invoice/invoice-routing.module';
import { HeaderComponent } from './header/header.component';
import { InvoiceContainerComponent } from './invoice-container/invoice-container.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { InvoicGenerateComponent } from './invoic-generate/invoic-generate.component';


@NgModule({
  declarations: [
    InvoiceContainerComponent,
    SidemenuComponent,
    HeaderComponent,
    InvoicGenerateComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
