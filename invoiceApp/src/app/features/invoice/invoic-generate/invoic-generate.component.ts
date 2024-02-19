import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoic-generate',
  templateUrl: './invoic-generate.component.html',
  styleUrls: ['./invoic-generate.component.scss'],
})
export class InvoicGenerateComponent implements OnInit {
  value;
  timeCategories = ['Morning', 'Afternoon', 'Evening', 'Night'];
  unitList = [
    {
      id: 1,
      item: 'Kg',
    },
    {
      id: 2,
      item: 'gram',
    },
    {
      id: 3,
      item: 'Pc',
    },
    {
      id: 4,
      item: 'Dozen',
    },
    {
      id: 5,
      item: 'Box',
    },
  ];
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1001',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1001',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ];

  //ProductDropdown
  countries: any[] = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
  ];
  selectedCountry: string | undefined;
  selectedUnit;

  //Form
  invoiceForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //On Load Methods
    this.getInitalizedForm();

    // Subscribe to form changes to recalculate total price
    // this.invoiceForm
    //   .get('BillOfproducts')
    //   .valueChanges.subscribe((formcontrol) => {
    //     console.log('Changes: ', formcontrol);

    //     // this.calculateTotalPrice();
    //   });
    // // Subscribe to form changes to recalculate total price
    // this.invoiceForm.valueChanges.subscribe((formcontrol) => {
    //   console.log('Changes: ', formcontrol);

    //   // this.calculateTotalPrice();
    // });
  }

  // Method : Initalized Invoice Form
  getInitalizedForm() {
    this.invoiceForm = this.formBuilder.group({
      invoiceNo: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      invoiceTime: ['', Validators.required],
      customerDetails: this.formBuilder.group({
        customerName: ['', Validators.required],
        customerEmail: [''],
        customerPhoneNumber: [''],
        customerMobileNumber: [''],
        customerAddress1: ['', Validators.required],
        customerAddress2: [''],
      }),
      BusinessDetails: this.formBuilder.group({
        BusinessName: [''],
        BusinessEmail: [''],
        BusinessPhoneNumber: [''],
        BusinessMobileNumber: [''],
        BusinessAddress1: [''],
        BusinessAddress2: [''],
      }),
      BillOfproducts: this.formBuilder.array([
        this.formBuilder.group({
          productName: ['', Validators.required],
          quantity: ['', [Validators.required]],
          unit: ['', Validators.required],
          rate: ['', Validators.required],
          amount: ['', Validators.required],
        }),
      ]),
      subTotal: [''],
      deliveryCharge: [''],
      cancelledCharge: [''],
      totalBill: [''],
    });
  }

  // Method: Used to get only product table obj
  get BillofproductArray() {
    return this.invoiceForm.get('BillOfproducts') as FormArray;
  }

  //Method: Add New Product for Invoice
  addNewProduct() {
    let newEntity = this.invoiceForm.get('BillOfproducts') as FormArray;
    newEntity.push(
      this.formBuilder.group({
        productName: ['', Validators.required],
        quantity: ['', Validators.required],
        unit: ['', Validators.required],
        rate: ['', Validators.required],
        amount: ['', Validators.required],
      })
    );

    // console.log('New ; ', newEntity);
  }

  //Method: Remove New Product for Invoice
  removeProduct(index: number) {
    this.BillofproductArray.removeAt(index);
    this.calculateInvoiceSubTotal();
  }

  // Method : Generate Bill and Submti to API
  getInvoiceDetails() {
    this.invoiceForm.markAllAsTouched();
    // console.log('Invoice Form  :', this.invoiceForm);
    if (this.invoiceForm.valid) {
      console.log('Invoice Form  :', this.invoiceForm);
    }
  }

  //Method: Used to Get Product AMount quantity and Rate Wise
  calculateTotalPrice(index: number) {
    let BillOfproducts = (this.invoiceForm.get('BillOfproducts') as FormArray)
      .controls;
    let selectedProduct = BillOfproducts[index];
    console.log('selectedProduct: ', selectedProduct);

    // let quantity = selectedProduct.value['quantity'];
    let quantity = selectedProduct.get('quantity').value;
    let rate = selectedProduct.get('rate').value;
    let unit = selectedProduct.get('unit').value;

    //Check for Gram Unit
    let amount: number = Number(quantity) * Number(rate);
    selectedProduct.get('amount').patchValue(amount, { emitEvent: false });

    this.calculateInvoiceSubTotal();
  }

  //Method : Find SubTotal of All the Product user Selected
  calculateInvoiceSubTotal() {
    let totalAmount = 0;
    let BillOfproducts = (this.invoiceForm.get('BillOfproducts') as FormArray)
      .controls;
    BillOfproducts.forEach((formObj) => {
      totalAmount += formObj.get('amount').value;
    });
    this.invoiceForm
      .get('subTotal')
      .patchValue(totalAmount, { emitEvent: false });

    this.calculateDeliveryCharge();
    this.calculateCancelledOrderCharge();
  }

  //Method: Add Delivery Charge
  calculateDeliveryCharge() {
    let subTotal = this.invoiceForm.get('subTotal').value;
    let totalBill = subTotal + this.invoiceForm.get('deliveryCharge').value;
    this.invoiceForm
      .get('totalBill')
      .patchValue(totalBill, { emitEvent: false });
  }

  //Method: Remove Cancelled Order Charge Charge
  calculateCancelledOrderCharge() {
    let subTotal = this.invoiceForm.get('subTotal').value;
    let totalBill =
      subTotal +
      this.invoiceForm.get('deliveryCharge').value -
      this.invoiceForm.get('cancelledCharge').value;
    this.invoiceForm
      .get('totalBill')
      .patchValue(totalBill, { emitEvent: false });
  }

  // Option 1
  resetForm() {
    this.invoiceForm.reset();
  }
}
