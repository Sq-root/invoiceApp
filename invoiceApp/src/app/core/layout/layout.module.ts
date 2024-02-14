import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../features/invoice/header/header.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { SidemenuComponent } from '../../features/invoice/sidemenu/sidemenu.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [MasterPageComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule,  NgxSpinnerModule],
})
export class LayoutModule {}
