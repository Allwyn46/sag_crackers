import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prodtable } from './prodtable';

describe('Prodtable', () => {
  let component: Prodtable;
  let fixture: ComponentFixture<Prodtable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prodtable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prodtable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
