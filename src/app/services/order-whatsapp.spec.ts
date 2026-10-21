import { TestBed } from '@angular/core/testing';

import { OrderWhatsappService } from './order-whatsapp';

describe('OrderWhatsapp', () => {
  let service: OrderWhatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderWhatsappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
