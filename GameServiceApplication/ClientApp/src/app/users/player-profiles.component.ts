import {Component, OnInit} from '@angular/core';
import {PlayerProfilesService} from "./player-profiles.service";
import {PlayerProfileRm} from "./player-profile.rm";
import {ActivatedRoute} from "@angular/router";

export interface CreatePlayerProfileRequestRm {
  userName: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
}

export class CreatePlayerProfileRequest implements CreatePlayerProfileRequestRm {
  confirmPassword = "";
  email = "";
  password = "";
  phone = "";
  userName = "";
}

export enum ResponseState {
  Waiting,
  InvalidEmail,
  InvalidPhone,
  SomeFieldIsEmpty,
  PasswordIsTooWeak,
  PasswordsMismatch,
  Success
}

export interface CreatePlayerProfileResponseRm {
  state: ResponseState,
}

export class CreatePlayerProfileResponse implements CreatePlayerProfileResponseRm{
  state = ResponseState.Waiting
}

@Component({
  selector: 'app-players',
  templateUrl: './player-profiles.component.html',
  styleUrls: ['./player-profiles.component.css']
})
export class PlayerProfilesComponent implements OnInit{
  public createPlayerProfileResponse: CreatePlayerProfileResponseRm | undefined;
  public createPlayerProfileRequest = new CreatePlayerProfileRequest();
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

  requestCreateUser(): void {
    this.createPlayerProfileResponse = new CreatePlayerProfileResponse();
    this.playerProfilesService.postCreatePlayer(this.createPlayerProfileRequest).subscribe(
      response => {
        this.createPlayerProfileResponse = response
        console.log(`Created user state ${this.createPlayerProfileResponse?.state}`);
    })
  }

  protected readonly ResponseState = ResponseState;
}
