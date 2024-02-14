import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice-container',
  templateUrl: './invoice-container.component.html',
  styleUrls: ['./invoice-container.component.scss']
})
export class InvoiceContainerComponent implements OnInit {
autoIndex:number = 123243
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.show()
  }

  //Toast Msg
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Hello' });
}

}
