import {Component, OnInit} from '@angular/core';
import {PlayerProfilesService} from "./player-profiles.service";
import {ActivatedRoute} from "@angular/router";

export interface PlayerProfileRm {
  playerId: number;
  email: string;
  passwordHash: string;
  name: string;
  phoneNumber: string;
  registrationDate: Date;
  hashSalt: number;
}

export class PlayerProfile implements PlayerProfileRm {
  email = "";
  hashSalt = 0;
  name = "";
  passwordHash = "";
  phoneNumber = "";
  playerId = -1;
  registrationDate = new Date();
}

export interface CreatePlayerProfileRequestRm {
  name: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
}

export class CreatePlayerProfileRequest implements CreatePlayerProfileRequestRm {
  name = "";
  email = "";
  phoneNumber = "";
  password = "";
  confirmPassword = "";
}

export enum ResponseState {
  Waiting,
  InvalidEmail,
  InvalidPhone,
  SomeFieldIsEmpty,
  PasswordIsTooWeak,
  PasswordsMismatch,
  Success,
  UserExists,
  UndefinedError,
}

export interface CreatePlayerProfileResponseRm {
  state: ResponseState,
}

export class CreatePlayerProfileResponse implements CreatePlayerProfileResponseRm {
  state = ResponseState.Waiting
}

@Component({
  selector: 'app-players',
  templateUrl: './player-profiles.component.html',
  styleUrls: ['./player-profiles.component.css']
})
export class PlayerProfilesComponent implements OnInit {
  public createPlayerProfileResponse: CreatePlayerProfileResponseRm | undefined;

  public createPlayerProfileRequest: CreatePlayerProfileRequest = {
    name: "Test", email: "test@gmail.com", phoneNumber: "+7978777777", password: "123123", confirmPassword: "123123"
  };

  public users: PlayerProfileRm[] = [];

  constructor(public readonly playerProfilesService: PlayerProfilesService, private route: ActivatedRoute) {
  }

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
    console.log(this.createPlayerProfileRequest);
    this.createPlayerProfileResponse = new CreatePlayerProfileResponse();
    this.playerProfilesService.postRegisterPlayer(this.createPlayerProfileRequest).subscribe(
      response => {
        this.createPlayerProfileResponse = response
        console.log(`Created user state ${this.createPlayerProfileResponse?.state}`);
      })
  }

  protected readonly ResponseState = ResponseState;
}
