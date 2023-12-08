import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PlayerProfileRm} from "./player-profile.rm";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SearchParameters} from "./player-profiles.component";

@Injectable({
  providedIn: 'root'
})
export class PlayerProfilesService {
  private playerProfilesUrl = environment.apiBaseUrl + environment.playerProfilesEndpoint;

  constructor(private http: HttpClient) {}

  getAllPlayerProfiles(): Observable<PlayerProfileRm[]>{
    return this.http.get<PlayerProfileRm[]>(this.playerProfilesUrl);
  }

  searchPlayers(searchParameters: SearchParameters) : Observable<PlayerProfileRm[]>{
    return this.http.post<PlayerProfileRm[]>(this.playerProfilesUrl, searchParameters);
  }
}
