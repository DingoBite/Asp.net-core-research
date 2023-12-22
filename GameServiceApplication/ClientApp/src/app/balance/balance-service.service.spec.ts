import { TestBed } from '@angular/core/testing';

import { BalanceServiceService } from './balance-service.service';

describe('BalanceServiceService', () => {
  let service: BalanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
