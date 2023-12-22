import {Component, OnInit} from '@angular/core';
import {PlayerProfilesService} from "./player-profiles.service";
import {PlayerProfileRm} from "./player-profile.rm";

@Component({
  selector: 'app-players',
  templateUrl: './player-profiles.component.html',
  styleUrls: ['./player-profiles.component.css']
})
export class PlayerProfilesComponent implements OnInit{

  public searchResultPlayers: PlayerProfileRm[] = [];
  constructor(private playerProfilesService: PlayerProfilesService) {}

  ngOnInit(): void {
    this.loadPlayerProfiles();
  }

  loadPlayerProfiles(): void {
    this.playerProfilesService.getAllPlayerProfiles()
      .subscribe(response => {
        this.searchResultPlayers = response;
      });
    console.log(`Loaded all players`);
  }

  redirectToPlayerPage(id: number): void {
    this.playerProfilesService.redirectToProfilePage(id);
    console.log(`Redirect to player with id: ${id}`);
  }
}
