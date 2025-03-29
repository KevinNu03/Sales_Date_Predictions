import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdersViewComponent } from './modal-orders-view.component';

describe('ModalOrdersViewComponent', () => {
  let component: ModalOrdersViewComponent;
  let fixture: ComponentFixture<ModalOrdersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrdersViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
