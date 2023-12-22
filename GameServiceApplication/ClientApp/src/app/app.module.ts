import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {PlayerProfilesComponent} from "./users/player-profiles.component";

import {environment} from "../environments/environment";
import {ProfileComponent} from "./profile/profile.component";
import {BalanceComponent} from "./balance/balance.component";
import {InventoryComponent} from "./inventory/inventory.component";

const usersEndpoint = environment.usersEndpoint.substring(1);
const userProfilesEndpoint = usersEndpoint + environment.userProfilesEndpoint;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PlayerProfilesComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: usersEndpoint, pathMatch: "full"},
      {path: usersEndpoint, component: PlayerProfilesComponent, pathMatch: 'full'},
      {path: userProfilesEndpoint, redirectTo: usersEndpoint, pathMatch: "full"},
      {path: userProfilesEndpoint + environment.profileEndpoint + environment.idParameterEndpoint, component: ProfileComponent, pathMatch: "full"},
      // {path: userProfilesEndpoint + environment.balanceEndpoint + environment.idParameterEndpoint, component: BalanceComponent, pathMatch: "full"},
      // {path: userProfilesEndpoint + environment.inventoryEndpoint + environment.idParameterEndpoint, component: InventoryComponent, pathMatch: "full"},
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
