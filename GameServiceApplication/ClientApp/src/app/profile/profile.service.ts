import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlayerProfileRm} from "../users/player-profile.rm";
import {RouterService} from "../general/router.service";
import {ProfileRouterService} from "../general/profile-router.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, public profileRouterService: ProfileRouterService) {}

  getCurrentPlayerProfile(): Observable<PlayerProfileRm>{
    const url = this.profileRouterService.rerouteService.makeIdEndpointWithCurrentId(environment.apiBaseUrl + this.profileRouterService.profilePage);
    if (url == null)
    {
      console.error("Url is null")
      return new Observable<PlayerProfileRm>();
    }
    return this.http.get<PlayerProfileRm>(url);
  }
}
