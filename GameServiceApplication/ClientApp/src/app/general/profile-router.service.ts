import {Injectable} from '@angular/core';
import {RouterService} from "./router.service";
import {environment} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfileRouterService {
  public readonly pathBase = environment.usersEndpoint + environment.userProfilesEndpoint;
  public readonly profilePage = this.pathBase + environment.profileEndpoint;
  public readonly balancePage = this.pathBase + environment.balanceEndpoint;
  public readonly inventoryPage = this.pathBase + environment.inventoryEndpoint;

  constructor(public rerouteService: RouterService) {
  }

  rerouteToProfileWithId(id: number) : void{
    this.rerouteService.redirectToPageWithId(this.profilePage, id);
  }

  rerouteToProfile(): void {
    this.rerouteService.redirectToPageWithCurrentId(this.profilePage);
  }

  rerouteToBalance(): void {
    this.rerouteService.redirectToPageWithCurrentId(this.balancePage);
  }

  rerouteToInventory(): void {
    this.rerouteService.redirectToPageWithCurrentId(this.inventoryPage);
  }

  init(route: ActivatedRoute) {
    this.rerouteService.init(route);
  }
}
