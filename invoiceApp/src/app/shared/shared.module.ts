import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from './services/base.service';
import { BaseComponentComponent } from './base-component/base-component.component';

@NgModule({
  declarations: [
    BaseComponentComponent
  ],
  imports: [CommonModule],
  providers: [BaseService],
})
export class SharedModule {}
