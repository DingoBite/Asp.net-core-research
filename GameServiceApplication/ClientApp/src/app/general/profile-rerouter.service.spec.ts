import { TestBed } from '@angular/core/testing';

import { ProfileRouterService } from './profile-router.service';

describe('ProfileRerouteServiceService', () => {
  let service: ProfileRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
