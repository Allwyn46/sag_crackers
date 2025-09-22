import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2'

type Category = {
  type: 'category';
  name: string;
};

type Product = {
  type: 'product';
  name: string;
  mrp: number;
  discount: number;
  requirement: string;
  finaleprice: string;
};

type ProductType = Category | Product;

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

  hasRequirement(): boolean {
    return this.products.some((p) => p.type === 'product' && +p.requirement > 0);
  }

  products: ProductType[] = [
    { type: 'category', name: 'SPARKLERS' },
    {
      type: 'product',
      name: '7 cm Colour Sparklers',
      mrp: 30,
      discount: 15,
      requirement: '',
      finaleprice: '0',
    },
    {
      type: 'product',
      name: '10 cm Electric Sparklers',
      mrp: 36,
      discount: 18,
      requirement: '',
      finaleprice: '0',
    },
    {
      type: 'product',
      name: '10 cm Colour Sparklers',
      mrp: 44,
      discount: 22,
      requirement: '',
      finaleprice: '0',
    },
    {
      type: 'product',
      name: '12 cm Electric Sparklers',
      mrp: 50,
      discount: 25,
      requirement: '',
      finaleprice: '0',
    },
    {
      type: 'product',
      name: '12 cm Colour Sparklers',
      mrp: 60,
      discount: 30,
      requirement: '',
      finaleprice: '0',
    },
    // ...
    { type: 'category', name: '2024 PREMIUM' },
    {
      type: 'product',
      name: '10 cm 50/50 Double Colour',
      mrp: 80,
      discount: 40,
      requirement: '',
      finaleprice: '0',
    },
    {
      type: 'product',
      name: '10 cm 4 in 1',
      mrp: 90,
      discount: 45,
      requirement: '',
      finaleprice: '0',
    },
    // ...
    // { type: 'category', name: 'FLOWER POTS' },
    // continue here
  ];

  //  EMAIL FUNCTION
  sendEmail() {
    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}`;

    // Build product list for the email template
    const orders = this.products
      .map((p, i) => {
        if (p.type === 'product' && +p.requirement > 0) {
          return {
            image_url: 'https://via.placeholder.com/64', // replace with actual product image if available
            name: p.name,
            units: p.requirement,
            price: this.productFinalPrices[i] || 0,
          };
        }
        return null;
      })
      .filter(Boolean); // remove nulls

    // Cost summary
    const cost = {
      shipping: 0, // you can calculate real shipping if needed
      tax: 0, // calculate tax if applicable
      total: this.getGrandTotal(),
    };

    // Template parameters must match the email template placeholders
    const templateParams = {
      order_id: orderId,
      orders, // this matches {{#orders}} loop
      cost,
      email: 'allwyns.per@gmail.com', // replace with the actual customer email
    };

    

    emailjs
      .send('service_zfcc7ui', 'template_xab3ko2', templateParams, 'ox63bWoQDr3hXhjVu')
      .then((res) => {
          Swal.fire({
              title: "Order Placed Successfully!",
              text: "Will Get back to you shortly",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Cool"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
        
      })
      .catch((err) => {
        console.error('FAILED...', err);
      });
  }
}
