import { Injectable } from '@angular/core';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  orderId: string;
  customerName: string;
  customerPhone: string; // digits only, with country code, e.g. 919876543210
  address: string;
  items: OrderItem[];
}

@Injectable({ providedIn: 'root' })
export class OrderWhatsappService {
  private readonly ownerPhone = '919677912570'; // your number, country code, no + or spaces

  private buildMessage(order: Order, forOwner: boolean): string {
    const lines = order.items.map(
      (i, idx) => `${idx + 1}. ${i.name} x ${i.qty} = ₹${i.qty * i.price}`,
    );
    const total = order.items.reduce((sum, i) => sum + i.qty * i.price, 0);

    const header = forOwner
      ? `*New Order #${order.orderId}*`
      : `*Order Confirmation #${order.orderId}*\nThank you for your order, ${order.customerName}!`;

    return [
      header,
      '',
      `Name: ${order.customerName}`,
      `Phone: ${order.customerPhone}`,
      `Address: ${order.address}`,
      '',
      '*Items*',
      ...lines,
      '',
      `*Total: ₹${total}*`,
    ].join('\n');
  }

  private link(phone: string, text: string): string {
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  /** Customer side: opens WhatsApp with the order addressed to the owner */
  sendOrderToOwner(order: Order): void {
    window.open(this.link(this.ownerPhone, this.buildMessage(order, true)), '_blank');
  }

  /** Owner side: opens WhatsApp with a confirmation addressed to the customer */
  sendConfirmationToCustomer(order: Order): void {
    window.open(this.link(order.customerPhone, this.buildMessage(order, false)), '_blank');
  }
}
