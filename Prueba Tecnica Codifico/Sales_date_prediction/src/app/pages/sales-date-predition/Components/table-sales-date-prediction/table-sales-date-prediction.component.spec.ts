import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSalesDatePredictionComponent } from './table-sales-date-prediction.component';

describe('TableSalesDatePredictionComponent', () => {
  let component: TableSalesDatePredictionComponent;
  let fixture: ComponentFixture<TableSalesDatePredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSalesDatePredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSalesDatePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
