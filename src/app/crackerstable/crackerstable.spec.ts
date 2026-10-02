import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crackerstable } from './crackerstable';

describe('Crackerstable', () => {
  let component: Crackerstable;
  let fixture: ComponentFixture<Crackerstable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crackerstable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crackerstable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
