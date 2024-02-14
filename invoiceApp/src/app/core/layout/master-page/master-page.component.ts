import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalConstant } from 'src/app/shared/model/dataModel';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss'],
})
export class MasterPageComponent implements OnInit {
  constructor(private _utilityService: BaseService,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    console.log('Master');
    // OnLoad Method
    this.onLoadMethods();
  }

  onLoadMethods() {
    this.fetchConfigDetails();
  }

  // Method: Used to fetch all Config det ails
  fetchConfigDetails() {
    this._utilityService.readConfigDetails().subscribe((data) => {
      GlobalConstant.baseURL = data['configs']['baseURL'];
      console.log('baseURl: ', GlobalConstant.baseURL);
    });
  }

  show(){
    this.spinner.show();
  }
}
