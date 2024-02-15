import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoic-generate',
  templateUrl: './invoic-generate.component.html',
  styleUrls: ['./invoic-generate.component.scss'],
})
export class InvoicGenerateComponent implements OnInit {
  value;
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

  constructor() {}

  ngOnInit(): void {}
}
