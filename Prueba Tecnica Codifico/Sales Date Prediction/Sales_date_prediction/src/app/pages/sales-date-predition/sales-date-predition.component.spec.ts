import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDatePreditionComponent } from './sales-date-predition.component';

describe('SalesDatePreditionComponent', () => {
  let component: SalesDatePreditionComponent;
  let fixture: ComponentFixture<SalesDatePreditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesDatePreditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesDatePreditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
