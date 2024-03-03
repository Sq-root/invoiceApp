import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-newproduct',
  templateUrl: './add-newproduct.component.html',
  styleUrls: ['./add-newproduct.component.scss'],
})
export class AddNewproductComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //On Load Methods
    this.getInitalizedForm();
  }

  getInitalizedForm() {
    this.productForm = this.fb.group({
      productName: [],
      productRate: this.fb.array([
        this.fb.group({
          rate: ['', Validators.required],
          unit: [0, [Validators.required]],
        }),
      ]),
    });
  }
}
