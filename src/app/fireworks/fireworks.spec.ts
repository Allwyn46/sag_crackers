import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fireworks } from './fireworks';

describe('Fireworks', () => {
  let component: Fireworks;
  let fixture: ComponentFixture<Fireworks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fireworks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fireworks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
