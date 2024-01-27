import {Component, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";
import {ActivatedRoute} from "@angular/router";
import {PlayerProfile} from "../users/player-profiles.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public profileData: PlayerProfile = new PlayerProfile();

    constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.profileService.profileRouterService.init(this.route);
      this.subscribe();
    }

    subscribe(): void {
      this.profileService.getCurrentPlayerProfile()
        .subscribe(
          response => {
            this.profileData = response
            console.log(this.profileData)
          }
        )
    }
}
