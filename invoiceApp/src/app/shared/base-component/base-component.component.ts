import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../plugins';

@Component({
  selector: 'app-base-component',
  template: '',
})
export class BaseComponentComponent implements OnInit {
  protected _router: Router;
  protected _location: Location;
  protected _activatedRoute: ActivatedRoute;
  protected _baseService: BaseService;
  constructor() {}

  ngOnInit(): void {}
}
