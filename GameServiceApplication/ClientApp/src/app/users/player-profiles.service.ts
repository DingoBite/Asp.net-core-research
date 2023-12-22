import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PlayerProfileRm} from "./player-profile.rm";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PlayerProfilesService {
  private playerProfilesUrl = environment.apiBaseUrl + environment.usersEndpoint;
  private playerProfilePage = environment.apiBaseUrl + environment.usersEndpoint + environment.userProfilesEndpoint + environment.profileEndpoint;

  constructor(private http: HttpClient, private router: Router) {}

  getAllPlayerProfiles(): Observable<PlayerProfileRm[]>{
    return this.http.get<PlayerProfileRm[]>(this.playerProfilesUrl);
  }

  redirectToProfilePage(id: number): void {
    this.router.navigate([this.makeIdEndpoint(this.playerProfilePage, id)])
      .then(r => console.log(`Redirected state:${r}`))
  }

  private makeIdEndpoint(url: string, id: number): string {
    return url + `/${id}`;
  }
}
