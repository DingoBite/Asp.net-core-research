import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProfileRouterService} from "../general/profile-router.service";
import {Observable} from "rxjs";
import {CardRm, CreateCardRequest} from "../cards/cards.component";
import {IdNamePair, IdNamePairRm, IdNameTypePair} from "../artifacts/artifacts.component";
import {ActivatedRoute} from "@angular/router";
import {IntIntPair, InventoryEntity} from "./inventory.component";
import {RouterService} from "../general/router.service";

export class PlayerAssignedEntity{
  userId = 0
  entityType = 0
  entityId = 0
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // private playerProfilesUrl= environment.apiBaseUrl + environment.usersEndpoint + environment.inventoryEndpoint;
  // private addItemUrl= environment.apiBaseUrl + environment.usersEndpoint + environment.addItemEndpoint;
  // private removeItemUrl= environment.apiBaseUrl + environment.usersEndpoint + environment.removeEndpoint;
  //
  // constructor(private http: HttpClient, private routerService: ProfileRouterService, public rerouteService: RouterService) {}
  //
  // getAll(): Observable<InventoryEntity[]>{
  //   const id = this.rerouteService.getURLIdParam()
  //   if (id == null)
  //   {
  //     console.log(`id is null`)
  //     return
  //   }
  //   return this.http.get<InventoryEntity[]>(`${this.playerProfilesUrl}/${id}`);
  // }
  //
  // postAdd(request: IntIntPair): Observable<any>{
  //   const id = this.rerouteService.getURLIdParam()
  //   if (id == null)
  //   {
  //     console.log(`id is null`)
  //     return
  //   }
  //   const body = new PlayerAssignedEntity()
  //   body.userId = id
  //   body.entityId = request.id
  //   body.entityType = request.type
  //   return this.http.post<any>(`${this.addItemUrl}/${id}`, body)
  // }
  //
  // postRemove(request: IntIntPair): Observable<any>{
  //   const id = this.rerouteService.getURLIdParam()
  //   if (id == null)
  //   {
  //     console.log(`id is null`)
  //     return
  //   }
  //   const body = new PlayerAssignedEntity()
  //   body.userId = id
  //   body.entityId = request.id
  //   body.entityType = request.type
  //   return this.http.post<any>(this.removeItemUrl, request)
  // }
  //
  // init(route: ActivatedRoute) {
  //   this.routerService.init(route);
  // }
}
