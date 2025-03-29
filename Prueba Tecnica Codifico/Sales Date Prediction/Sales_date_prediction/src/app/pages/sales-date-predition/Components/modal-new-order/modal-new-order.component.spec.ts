import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewOrderComponent } from './modal-new-order.component';

describe('ModalNewOrderComponent', () => {
  let component: ModalNewOrderComponent;
  let fixture: ComponentFixture<ModalNewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
