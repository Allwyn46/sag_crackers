import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

interface ProductType {
  type: string;
  name: string;
  mrp: number;
  discount: number;
  requirement: string;
  finaleprice: number;
}

@Component({
  selector: 'app-prodtable',
  imports: [CommonModule, FormsModule],
  templateUrl: './prodtable.html',
  styleUrl: './prodtable.css',
})
export class Prodtable {
  productFinalPrices: number[] = [];

  calculateFinalPrice(item: ProductType, index: number) {
    if (item.type === 'product') {
      const finalPrice = Number(item.discount) * Number(item.requirement || 0);
      this.productFinalPrices[index] = finalPrice;
    }
  }

  getGrandTotal(): number {
    return this.productFinalPrices.reduce((sum, price) => sum + (price || 0), 0);
  }

  getSerialNumber(index: number) {
    let count = 0;
    for (let i = 0; i <= index; i++) {
      if (this.products[i].type === 'product') count++;
    }
    return count;
  }

  products = [
    { type: 'category', name: 'SPARKLERS' },
    {
      type: 'product',
      name: '7 cm Colour Sparklers',
      mrp: 30,
      discount: 15,
      requirement: '',
      finaleprice: '',
    },
    {
      type: 'product',
      name: '10 cm Electric Sparklers',
      mrp: 36,
      discount: 18,
      requirement: '',
      finaleprice: '',
    },
    {
      type: 'product',
      name: '10 cm Colour Sparklers',
      mrp: 44,
      discount: 22,
      requirement: '',
      finaleprice: '',
    },
    {
      type: 'product',
      name: '12 cm Electric Sparklers',
      mrp: 50,
      discount: 25,
      requirement: '',
      finaleprice: '',
    },
    {
      type: 'product',
      name: '12 cm Colour Sparklers',
      mrp: 60,
      discount: 30,
      requirement: '',
      finaleprice: '',
    },
    // ...
    { type: 'category', name: '2024 PREMIUM' },
    {
      type: 'product',
      name: '10 cm 50/50 Double Colour',
      mrp: 80,
      discount: 40,
      requirement: '',
      finaleprice: '',
    },
    {
      type: 'product',
      name: '10 cm 4 in 1',
      mrp: 90,
      discount: 45,
      requirement: '',
      finaleprice: '',
    },
    // ...
    { type: 'category', name: 'FLOWER POTS' },
    // continue here
  ];
}
