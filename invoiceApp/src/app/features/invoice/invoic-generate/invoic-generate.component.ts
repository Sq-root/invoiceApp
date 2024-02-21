import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Subject, takeUntil } from 'rxjs';
import { RestSigninService } from 'src/app/shared/services/rest-signin.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs; //Pdfmake Obj
@Component({
  selector: 'app-invoic-generate',
  templateUrl: './invoic-generate.component.html',
  styleUrls: ['./invoic-generate.component.scss'],
})
export class InvoicGenerateComponent implements OnInit, OnDestroy {
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
  listofProduct = [];
  selectedProduct = {};

  private unsubscribeAPIEventListenerData: Subject<Boolean> =
    new Subject<Boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private _invoiceService: RestSigninService
  ) {}

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

  //Method: Get All Product
  getAllProduct() {
    this._invoiceService
      .getproductdetails()
      .pipe(takeUntil(this.unsubscribeAPIEventListenerData))
      .subscribe((data) => {
        console.log('Product: ', data);
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

  // Method : Generate Bill and Submit to API
  getInvoiceDetails() {
    this.invoiceForm.markAllAsTouched();
    // console.log('Invoice Form  :', this.invoiceForm);
    if (this.invoiceForm.valid) {
      const invoiceData = this.invoiceForm.value;
      console.log('Invoice Form  :', invoiceData);
      this.generateInvoice(invoiceData); //Generate PDF
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

  generateInvoice(invoicedata: any) {
    let dd = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60], // [left, top, right, bottom]
      background: function (currentPage, pageSize) {
        return {
          stack: [
            {
              canvas: [
                {
                  type: 'rect',
                  x: 25, // Left margin
                  y: 37, // Top margin
                  w: pageSize.width - 50, // Page width - (left margin + right margin)
                  h: pageSize.height - 90, // Page height - (top margin + bottom margin)
                  lineWidth: 2,
                  lineColor: '#000', // Border color
                },
              ],
            },
          ],
        };
      },
      content: [
        {
          text: 'MANUBHAI PANDYA',
          fontSize: 25,
          bold: true,
          alignment: 'center',
          color: '#000',
        },
        {
          text: '(FRESH & EXOTIC VEGETABLE SUPPLIERS)',
          fontSize: 10,
          alignment: 'center',
          decoration: 'underline',
          color: '#gray',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            {
              width: '35%',
              stack: [
                'BMC MUNICIPAL MARKET,',
                'Borivali (West),',
                'Mumbai-400092,',
              ],
              lineHeight: 1.15,
              fontSize: 11,
              bold: true,
              alignment: 'left',
              margin: [0, 0, 0, 10],
            },
            {
              width: '*',
              stack: [
                `Mob No : 9821159981`,
                'Tel No: 022 28901729 ',
                '022 28908169',
              ],
              lineHeight: 1.2,
              fontSize: 11,
              bold: true,
              alignment: 'right',
            },
          ],
        },
        {
          canvas: [
            { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 },
          ], // Adding a horizontal line
        },
        {
          margin: [0, 20, 0, 10],
          columns: [
            {
              width: '60%',
              stack: [
                {
                  text: 'Bill To :',
                  alignment: 'left',
                  bold: true,
                  fontSize: 13,
                  margin: [0, 0, 0, 2],
                },
                { text: invoicedata.customerDetails.customerName },
                { text: invoicedata.customerDetails.customerEmail },
                { text: invoicedata.customerDetails.customerAddress1 },
                { text: invoicedata.customerDetails.customerAddress2 },
                { text: invoicedata.customerDetails.customerPhoneNumber },
                { text: invoicedata.customerDetails.customerMobileNumber },
              ],
              lineHeight: 1.2,
              margin: [0, 0, 0, 10],
            },
            {
              width: '*',
              margin: [0, 13, 0, 10],
              stack: [
                { text: `Invoice No: ${(Math.random() * 1000).toFixed(0)}` },
                {
                  text: `Date: ${new Date(
                    invoicedata.invoiceDate
                  ).toDateString()}`,
                },
                { text: `Time: ${invoicedata.invoiceTime}` },
              ],
              fontSize: 12,
              bold: true,
              lineHeight: 1.8,
              alignment: 'right',
            },
          ],
          columnGap: 10,
        },
        {
          lineHeight: 1.2,
          table: {
            headerRows: 1,
            widths: [250, 130, '*'],
            body: [
              [
                { text: 'VEGETABLES NAME', style: 'header' },
                { text: 'QUANTITY', style: 'header' },
                { text: 'TOTAL', style: 'header' },
              ],
              ...invoicedata.BillOfproducts.map((item) => [
                item.productName.name,
                item.quantity,
                item.amount,
              ]),
            ],
          },
        },
        {
          margin: [0, 15, 0, 5],
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'Payment Subtotal',
                  border: [false, false, false, false],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, false],
                  text: `₹ ${invoicedata.subTotal}`,
                  alignment: 'right',
                  fillColor: '#f5f5f5',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Delivery Charge (+)',
                  border: [false, false, false, false],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `₹ ${invoicedata.deliveryCharge}`,
                  border: [false, false, false, false],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Vegetable Return Amount (-)',
                  border: [false, false, false, false],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `₹ ${invoicedata.cancelledCharge}`,
                  border: [false, false, false, false],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Total Amount',
                  bold: true,
                  fontSize: 16,
                  alignment: 'right',
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: `₹ ${invoicedata.totalBill}`,
                  bold: true,
                  fontSize: 16,
                  alignment: 'right',
                  border: [false, false, false, false],
                  fillColor: '#f5f5f5',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fillColor: '#cccccc', // Gray color for the header
          bold: true,
          fontSize: 13,
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        // Document Footer
        documentFooterLeft: {
          fontSize: 10,
          margin: [25, 5, 5, 5],
          alignment: 'left',
        },
        documentFooterCenter: {
          fontSize: 10,
          margin: [25, 5, 5, 5],
          alignment: 'center',
        },
        documentFooterRight: {
          fontSize: 10,
          margin: [25, 5, 5, 5],
          alignment: 'right',
        },
      },
    };
    pdfMake.createPdf(dd).open();
  }

  // Reset Form
  resetForm() {
    this.invoiceForm.reset();
  }

  ngOnDestroy(): void {
    this.unsubscribeAPIEventListenerData.next(true);
    this.unsubscribeAPIEventListenerData.complete();
  }
}
