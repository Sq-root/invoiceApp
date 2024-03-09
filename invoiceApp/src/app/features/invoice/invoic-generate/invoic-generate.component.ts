import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, map } from 'rxjs';
import { RestSigninService } from 'src/app/shared/services/rest-signin.service';
import { MenuItem } from 'primeng/api';
//importing the encoded font file
import { fonts } from './../../../shared/font_config/pdfFonts';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../../assets/font/vfs_fonts.js';
import { PdfmakerService } from 'src/app/shared/services/pdfmaker.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;
@Component({
  selector: 'app-invoic-generate',
  templateUrl: './invoic-generate.component.html',
  styleUrls: ['./invoic-generate.component.scss'],
})
export class InvoicGenerateComponent implements OnInit, OnDestroy {
  value;
  timeCategories = ['Morning', 'Afternoon', 'Evening', 'Night'];
  unitList = ['Kg', 'Gram', 'Pc', 'Dozen', 'Box', 'Pkt', 'Judi'];
  products = [];
  selectedUnit: String = '';
  //Form
  invoiceForm: FormGroup;
  selectedProduct = {};
  invoiceDate: String = '';
  invoiceNo: number = 0;
  invoiceStatementObj = {};
  //Menu bar
  toolbar: MenuItem[] | undefined;

  private unsubscribeAPIEventListenerData: Subject<Boolean> =
    new Subject<Boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private _invoiceService: RestSigninService,
    private _pdfmaker: PdfmakerService
  ) {}

  ngOnInit(): void {
    //On Load Methods
    this.getInitalizedForm();
    this.getAllProduct();
  }

  // Method : Initalized Invoice Form
  getInitalizedForm() {
    //Random No
    // let no = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    this.invoiceForm = this.formBuilder.group({
      invoiceNo: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      invoiceTime: ['', Validators.required],
      customerDetails: this.formBuilder.group({
        customerName: ['', Validators.required],
        customerEmail: [''],
        customerPhoneNumber: [''],
        customerMobileNumber: [''],
        customerAddress1: [''],
        customerAddress2: [''],
      }),
      BusinessDetails: this.formBuilder.group({
        BusinessName: ['MANUBHAI PANDYA'],
        BusinessEmail: ['mkpandya@gmail.com'],
        BusinessPhoneNumber: ['022 28901729'],
        BusinessMobileNumber: ['9821159981'],
        BusinessAddress1: ['Shop No. 21/22, B.M.C Vegetable Market'],
        BusinessAddress2: ['Borivali (West), Mumbai 400092'],
      }),
      BillOfproducts: this.formBuilder.array([
        this.formBuilder.group({
          productName: ['', Validators.required],
          quantity: ['', [Validators.required]],
          unit: [0, Validators.required],
          rate: [0, Validators.required],
          amount: [0, Validators.required],
        }),
      ]),
      subTotal: [0.0],
      deliveryCharge: ['0.0'],
      cancelledCharge: ['0.0'],
      totalBill: [0.0],
    });

    this.toolbar = [
      {
        tooltipOptions: {
          tooltipLabel: 'Save',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-save',
        // command: () => {
        //     this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        // }
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Refresh',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-refresh',
        // command: () => {
        //     this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        // }
      },
      // {
      //   tooltipOptions: {
      //     tooltipLabel: 'Delete',
      //     tooltipPosition: 'left',
      //   },
      //   icon: 'pi pi-trash',
      //   // command: () => {
      //   //     this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
      //   // }
      // },
      {
        icon: 'pi pi-upload',
        tooltipOptions: {
          tooltipLabel: 'Download',
          tooltipPosition: 'left',
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Preview',
          tooltipPosition: 'left',
        },
        icon: 'pi pi-external-link',
        command: () => {},
      },
    ];
  }

  //Method: Get All Product
  getAllProduct() {
    this._invoiceService
      .getproductdetails()
      .pipe(takeUntil(this.unsubscribeAPIEventListenerData))
      .subscribe((data) => {
        if (data) {
          this.products = data;
        } else {
          this.products = [];
        }
      });
  }

  //Method: Get All Product
  getBillNo() {
    this._invoiceService
      .getInvoiceNo()
      .pipe(takeUntil(this.unsubscribeAPIEventListenerData))
      .subscribe((data) => {
        if (data) {
          this.invoiceNo = data;
        } else {
          this.invoiceNo = 0;
        }
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
  }

  //Method: Remove New Product for Invoice
  removeProduct(index: number) {
    this.BillofproductArray.removeAt(index);
    this.calculateInvoiceSubTotal();
  }

  selectDate(currentDate) {
    let date = new Date(currentDate);
    console.log('Date: ', date);
    let dt = date.getDate();
    let mn = date.getMonth();
    mn++;
    let yy = date.getFullYear();
    this.invoiceDate = dt + '/' + mn + '/' + yy;
    console.log('Date: ', this.invoiceDate);
    // this.invoiceForm
    //   .get('invoiceDate')
    //   .patchValue(newDate, { emitEvent: false });
  }

  // Method : Generate Bill and Submit to API
  getInvoiceDetails() {
    this.invoiceForm.markAllAsTouched();
    if (this.invoiceForm.valid) {
      this.invoiceStatementObj = this.invoiceForm.value;
      // console.log('Invoice Form  :', this.invoiceStatementObj);
      this.generateInvoice(); //Generate PDF
    }
  }

  //Method: Used to Get Product AMount quantity and Rate Wise
  calculateTotalPrice(index: number) {
    let BillOfproducts = (this.invoiceForm.get('BillOfproducts') as FormArray)
      .controls;
    let selectedProduct = BillOfproducts[index];
    // console.log('selectedProduct: ', selectedProduct);

    let quantity = Number(selectedProduct.get('quantity').value);
    let rate = Number(selectedProduct.get('rate').value);
    let amount = Number(quantity * rate).toFixed(2);
    console.log('Total Amount: ', amount);
    selectedProduct.get('amount').patchValue(amount, { emitEvent: false });
    this.calculateInvoiceSubTotal();
  }

  //Method : Find SubTotal of All the Product user Selected
  calculateInvoiceSubTotal() {
    let totalAmount = 0;
    let BillOfproducts = (this.invoiceForm.get('BillOfproducts') as FormArray)
      .controls;
    BillOfproducts.forEach((formObj) => {
      totalAmount += Number(formObj.get('amount').value);
    });
    const amount = totalAmount.toFixed(2);
    this.invoiceForm.get('subTotal').patchValue(amount, { emitEvent: false });

    this.calculateDeliveryCharge();
    this.calculateCancelledOrderCharge();
  }

  //Method: Add Delivery Charge
  calculateDeliveryCharge() {
    let subTotal = this.invoiceForm.get('subTotal').value;
    let totalBill = (
      Number(subTotal) + Number(this.invoiceForm.get('deliveryCharge').value)
    ).toFixed(2);
    this.invoiceForm
      .get('totalBill')
      .patchValue(totalBill, { emitEvent: false });
  }

  //Method: Remove Cancelled Order Charge Charge
  calculateCancelledOrderCharge() {
    let subTotal: number = Number(this.invoiceForm.get('subTotal').value);
    let totalBill = Number(
      subTotal +
        Number(this.invoiceForm.get('deliveryCharge').value) -
        Number(this.invoiceForm.get('cancelledCharge').value)
    ).toFixed(2);

    this.invoiceForm
      .get('totalBill')
      .patchValue(totalBill, { emitEvent: false });
  }

  getRoundOfAmount(invoicedata: any) {
    invoicedata['invoiceDate'] = this.invoiceDate;
    if (
      invoicedata &&
      invoicedata['BillOfproducts'] &&
      invoicedata['BillOfproducts'].length > 0
    ) {
      for (let i = 0; i < invoicedata['BillOfproducts'].length; i++) {
        //For Quantity
        let quantity = Number(invoicedata['BillOfproducts'][i].quantity);
        if (quantity && !Number.isInteger(quantity)) {
          invoicedata['BillOfproducts'][i].quantity = Number(
            invoicedata['BillOfproducts'][i].quantity
          ).toFixed(3);
        }

        //For Amount
        invoicedata['BillOfproducts'][i].amount = Number(
          invoicedata['BillOfproducts'][i].amount
        ).toFixed(2);
      }
    }
    invoicedata['deliveryCharge'] = Number(
      invoicedata['deliveryCharge']
    ).toFixed(2);
    invoicedata['cancelledCharge'] = Number(
      invoicedata['cancelledCharge']
    ).toFixed(2);
  }

  generateInvoice() {
    this.getRoundOfAmount(this.invoiceStatementObj);
    console.log('Modified Invoice', this.invoiceStatementObj);
    this.previewInvoice();
  }

  //Method: Save the Invoice
  saveInvoice() {
    //API Call
    console.log('Save Invoice..');
  }

  //Method: Download the Invoice
  DownloadInvoice() {
    console.log('Download Invoice..');
    this._pdfmaker.getDownloadpdf(this.invoiceStatementObj);
  }

  //Method: Download the Invoice
  previewInvoice() {
    console.log('Preview Invoice..');
    this._pdfmaker.getPreviewPdf(this.invoiceStatementObj);
  }

  // Reset Form
  resetForm() {
    this.invoiceForm.reset();
    this.invoiceStatementObj = {};
  }

  ngOnDestroy(): void {
    this.unsubscribeAPIEventListenerData.next(true);
    this.unsubscribeAPIEventListenerData.complete();
  }
}
