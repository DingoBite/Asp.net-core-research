import {Component, OnInit} from '@angular/core';
import {PlayerProfilesService} from "./player-profiles.service";
import {PlayerProfileRm} from "./player-profile.rm";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-players',
  templateUrl: './player-profiles.component.html',
  styleUrls: ['./player-profiles.component.css']
})
export class PlayerProfilesComponent implements OnInit{

  public users: PlayerProfileRm[] = [];
  constructor(public readonly playerProfilesService: PlayerProfilesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscribe();
    this.playerProfilesService.init(this.route);
  }

  subscribe(): void {
    this.playerProfilesService.getAllPlayerProfiles()
      .subscribe(response => {
        this.users = response;
      });
    console.log(`Loaded all players`);
  }
}
