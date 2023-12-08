import { TestBed } from '@angular/core/testing';

import { PlayerProfilesService } from './player-profiles.service';

describe('PlayerProfilesService', () => {
  let service: PlayerProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
