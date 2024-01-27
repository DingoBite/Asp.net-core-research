import { TestBed } from '@angular/core/testing';

import { InventoryService } from './inventory.service';

describe('InventoryServiceService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
