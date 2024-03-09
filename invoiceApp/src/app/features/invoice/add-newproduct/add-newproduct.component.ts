import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { RestSigninService } from 'src/app/shared/services/rest-signin.service';

@Component({
  selector: 'app-add-newproduct',
  templateUrl: './add-newproduct.component.html',
  styleUrls: ['./add-newproduct.component.scss'],
})
export class AddNewproductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  unitList = ['Kg', 'Gram', 'Pc', 'Dozen', 'Box', 'Pkt', 'Judi'];
  private unsubscribeAPIEventListenerData: Subject<Boolean> =
    new Subject<Boolean>();

  constructor(
    private fb: FormBuilder,
    private _productSerivce: RestSigninService,
    private _msgSerivce: ToastrService
  ) {}

  ngOnInit(): void {
    //On Load Methods
    this.getInitalizedForm();
  }

  getInitalizedForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productRateUnit: this.fb.array([
        this.fb.group({
          rate: [],
          unit: [],
        }),
      ]),
    });
  }

  // Method: Used to get only product table obj
  get productRateUnitMapping() {
    return this.productForm.get('productRateUnit') as FormArray;
  }

  //Method: Add New ProductRateUnit for Invoice
  addProductRateUnit() {
    let newEntity = this.productForm.get('productRateUnit') as FormArray;
    newEntity.push(
      this.fb.group({
        rate: [],
        unit: [],
      })
    );
  }

  //Method: Remove New removeProductRateUnit
  removeProductRateUnit(index: number) {
    this.productRateUnitMapping.removeAt(index);
  }

  saveProductDetails() {
    this.productForm.markAllAsTouched();
    if (this.productForm.valid) {
      this.insertNewProduct();
    }
  }

  insertNewProduct() {
    let product = {
      itemName: this.productForm.value['productName'],
      unit: {
        Kg: 0,
      },
    };
    this._productSerivce
      .saveNewProduct(product)
      .pipe(takeUntil(this.unsubscribeAPIEventListenerData))
      .subscribe((data) => {
        console.log('Product Added: ', data);
        this._msgSerivce.info('Product added successfully');
        this.productForm.reset();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAPIEventListenerData.next(true);
    this.unsubscribeAPIEventListenerData.complete();
  }
}
