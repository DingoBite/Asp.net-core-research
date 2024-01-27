import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProfileRouterService} from "../general/profile-router.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ArtifactRm, CreateArtifactRequestRm, IdNamePair, IdNamePairRm} from "./artifacts.component";

@Injectable({
  providedIn: 'root'
})
export class ArtifactsService {
  private controllerUrl= environment.apiBaseUrl + environment.artifactsEndpoint;
  private removeUrl= this.controllerUrl + environment.removeEndpoint;
  private availableTypes = this.controllerUrl + environment.availableTypesEndpoint;
  private generalUrl = environment.apiBaseUrl + environment.generalEndpoint;
  private availableRarities = this.generalUrl + environment.availableRaritiesEndpoint;

  constructor(private http: HttpClient, private routerService: ProfileRouterService) {}

  getAll(): Observable<ArtifactRm[]>{
    return this.http.get<ArtifactRm[]>(this.controllerUrl);
  }

  getAvailableTypesDict(): Observable<IdNamePairRm[]>{
    return this.http.get<IdNamePairRm[]>(this.availableTypes);
  }

  getAvailableRaritiesDict(): Observable<IdNamePair[]>{
    return this.http.get<IdNamePair[]>(this.availableRarities);
  }

  postRegister(request: CreateArtifactRequestRm): Observable<any>{
    return this.http.post<any>(this.controllerUrl, request)
  }

  postRemove(id: number): Observable<any>{
    return this.http.post<any>(this.removeUrl, id)
  }

  init(route: ActivatedRoute) {
    this.routerService.init(route);
  }
}
