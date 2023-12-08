import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProfilesComponent } from './player-profiles.component';

describe('PlayersComponent', () => {
  let component: PlayerProfilesComponent;
  let fixture: ComponentFixture<PlayerProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
