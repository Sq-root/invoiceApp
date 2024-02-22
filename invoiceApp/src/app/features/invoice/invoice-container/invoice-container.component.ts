import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice-container',
  templateUrl: './invoice-container.component.html',
  styleUrls: ['./invoice-container.component.scss'],
})
export class InvoiceContainerComponent implements OnInit {
  autoIndex: number = 123243;
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {

  }

  //Toast Msg
  show() {
    this.toastr.error(
      'Installed PAM Plugin or Kindly Contact to Administrator'
    );
  }
}
