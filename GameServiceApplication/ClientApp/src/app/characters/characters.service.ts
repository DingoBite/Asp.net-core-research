import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProfileRouterService} from "../general/profile-router.service";
import {Observable} from "rxjs";
import {CardRm, CreateCardRequest} from "../cards/cards.component";
import {IdNamePair, IdNamePairRm} from "../artifacts/artifacts.component";
import {ActivatedRoute} from "@angular/router";
import {CharacterRm, CreateCharacterRequest} from "./characters.component";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private controllerUrl = environment.apiBaseUrl + environment.charactersEndpoint;
  private removeUrl = this.controllerUrl + environment.removeEndpoint;
  private generalUrl = environment.apiBaseUrl + environment.generalEndpoint;
  private availableRarities = this.generalUrl + environment.availableRaritiesEndpoint;

  constructor(private http: HttpClient, private routerService: ProfileRouterService) {
  }

  getAll(): Observable<CharacterRm[]> {
    return this.http.get<CharacterRm[]>(this.controllerUrl);
  }

  getAvailableRaritiesDict(): Observable<IdNamePair[]> {
    return this.http.get<IdNamePair[]>(this.availableRarities);
  }

  postRegister(request: CreateCharacterRequest): Observable<any> {
    return this.http.post<any>(this.controllerUrl, request)
  }

  postRemove(id: number): Observable<any> {
    return this.http.post<any>(this.removeUrl, id)
  }

  init(route: ActivatedRoute) {
    this.routerService.init(route);
  }
}
