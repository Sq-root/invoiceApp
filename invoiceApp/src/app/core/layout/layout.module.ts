import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [HeaderComponent, MasterPageComponent, SidemenuComponent],
  imports: [CommonModule],
})
export class LayoutModule {}
