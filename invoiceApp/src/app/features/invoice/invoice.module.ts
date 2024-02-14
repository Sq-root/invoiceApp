import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';

import { InvoiceRoutingModule } from '../invoice/invoice-routing.module';
import { HeaderComponent } from './header/header.component';
import { InvoiceContainerComponent } from './invoice-container/invoice-container.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { InvoicGenerateComponent } from './invoic-generate/invoic-generate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    InvoiceContainerComponent,
    SidemenuComponent,
    HeaderComponent,
    InvoicGenerateComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    NgxSpinnerModule
  ],
})
export class InvoiceModule {}
