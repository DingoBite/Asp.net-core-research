import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProfileRouterService} from "../general/profile-router.service";
import {ActivatedRoute} from "@angular/router";
import {
  CreatePlayerProfileRequestRm,
  CreatePlayerProfileResponseRm, PlayerProfileRm
} from "./player-profiles.component";

@Injectable({
  providedIn: 'root'
})
export class PlayerProfilesService {
  private playerProfilesUrl= environment.apiBaseUrl + environment.usersEndpoint;

  constructor(private http: HttpClient, private routerService: ProfileRouterService) {}

  getAllPlayerProfiles(): Observable<PlayerProfileRm[]>{
    return this.http.get<PlayerProfileRm[]>(this.playerProfilesUrl);
  }

  postRegisterPlayer(request: CreatePlayerProfileRequestRm): Observable<CreatePlayerProfileResponseRm>{
    return this.http.post<CreatePlayerProfileResponseRm>(this.playerProfilesUrl, request)
  }

  redirectToProfilePage(id: number): void {
    this.routerService.rerouteToProfileWithId(id);
  }

  init(route: ActivatedRoute) {
    this.routerService.init(route);
  }
}
