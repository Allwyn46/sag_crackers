import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWhatsapp } from './order-whatsapp';

describe('OrderWhatsapp', () => {
  let component: OrderWhatsapp;
  let fixture: ComponentFixture<OrderWhatsapp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderWhatsapp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderWhatsapp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
