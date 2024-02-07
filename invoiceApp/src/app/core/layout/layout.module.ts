import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, MasterPageComponent, SidemenuComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
