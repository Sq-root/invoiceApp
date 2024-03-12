import { GlobalConstants } from './../../../shared/model/dataModel';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from '../../../shared/plugins';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss'],
})
export class MasterPageComponent implements OnInit {
  constructor(
    private _utilityService: BaseService,
    private spinner: NgxSpinnerService
  ) {}
  dataFetched: boolean = false;
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
      GlobalConstants.baseURL = data['configs']['baseURL'];
      this.dataFetched = true;
      console.log('baseURl: ', GlobalConstants.baseURL);
    });
  }

  show() {
    this.spinner.show();
  }
}
