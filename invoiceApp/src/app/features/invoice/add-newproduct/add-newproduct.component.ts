import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-newproduct',
  templateUrl: './add-newproduct.component.html',
  styleUrls: ['./add-newproduct.component.scss'],
})
export class AddNewproductComponent implements OnInit {
  productForm: FormGroup;
  unitList = ['Kg', 'Gram', 'Pc', 'Dozen', 'Box', 'Pkt', 'Judi'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //On Load Methods
    this.getInitalizedForm();
  }

  getInitalizedForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productRateUnit: this.fb.array([
        this.fb.group({
          rate: [0, Validators.required],
          unit: ['', [Validators.required]],
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
        rate: [0, Validators.required],
        unit: ['', [Validators.required]],
      })
    );
  }

  //Method: Remove New removeProductRateUnit
  removeProductRateUnit(index: number) {
    this.productRateUnitMapping.removeAt(index);
  }

  getNewProduct() {
    console.log('Product Form: ', this.productForm);
  }
}
