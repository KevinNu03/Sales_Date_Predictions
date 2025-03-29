import { TestBed } from '@angular/core/testing';

import { SalesDatePredictionServiceService } from './sales-date-prediction-service.service';

describe('SalesDatePredictionServiceService', () => {
  let service: SalesDatePredictionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesDatePredictionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
