import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [HeaderComponent, MasterPageComponent, SidemenuComponent],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
