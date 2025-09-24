import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { Master, ProductType } from '../master';
import { Digitsonly } from '../digitsonly';

@Component({
  selector: 'app-prodtable',
  imports: [CommonModule, FormsModule, Digitsonly],
  templateUrl: './prodtable.html',
  styleUrl: './prodtable.css',
})
export class Prodtable {
  masterDetails = inject(Master);
  productFinalPrices: number[] = [];

  user_name : string = "";
  user_mobile_number : string = "";

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

  products: ProductType[] = this.masterDetails.masterProducts;

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
      .filter(Boolean);

    // Cost summary
    const cost = {
      shipping: 0,
      tax: 0,
      total: this.getGrandTotal(),
    };

    // Template parameters must match the email template placeholders
    const templateParams = {
      order_id: orderId,
      orders,
      cost,
      email: 'frankie.sagay@gmail.com',
      customer_name: this.user_name,
      customer_mobile: this.user_mobile_number,
    };

    emailjs
      .send('service_zfcc7ui', 'template_xab3ko2', templateParams, 'ox63bWoQDr3hXhjVu')
      .then((res) => {
        Swal.fire({
          title: 'Order Placed Successfully!',
          text: 'Will Get back to you shortly',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Cool',
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
