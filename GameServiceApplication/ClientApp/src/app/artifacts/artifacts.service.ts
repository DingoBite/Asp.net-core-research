import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProfileRouterService} from "../general/profile-router.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ArtifactRm, CreateArtifactRequestRm, IdNamePair} from "./artifacts.component";

@Injectable({
  providedIn: 'root'
})
export class ArtifactsService {
  private generalUrl = environment.apiBaseUrl + environment.generalEndpoint;
  private artifactsUrl= environment.apiBaseUrl + environment.artifactsEndpoint;
  private availableTypes = this.artifactsUrl + environment.availableTypesEndpoint;

  constructor(private http: HttpClient, private routerService: ProfileRouterService) {}

  getAllArtifacts(): Observable<ArtifactRm[]>{
    return this.http.get<ArtifactRm[]>(this.artifactsUrl);
  }

  getAvailableTypesDict(): Observable<IdNamePair[]>{
    return this.http.get<IdNamePair[]>(this.availableTypes);
  }

  postRegisterArtifact(request: CreateArtifactRequestRm): Observable<any>{
    return this.http.post<any>(this.artifactsUrl, request)
  }

  init(route: ActivatedRoute) {
    this.routerService.init(route);
  }
}
