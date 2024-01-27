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
import {CharactersComponent} from "./characters/characters.component";
import {ArtifactsComponent} from "./artifacts/artifacts.component";
import {CardsComponent} from "./cards/cards.component";

const artifactsEndpoint = environment.artifactsEndpoint.substring(1);
const cardsEndpoint = environment.cardsEndpoint.substring(1);
const charactersEndpoint = environment.charactersEndpoint.substring(1);

const usersEndpoint = environment.usersEndpoint.substring(1);
const userProfilesEndpoint = usersEndpoint + environment.userProfilesEndpoint;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PlayerProfilesComponent,
    ArtifactsComponent,
    CardsComponent,
    CharactersComponent,
    ProfileComponent,
    BalanceComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: usersEndpoint, pathMatch: "full"},
      {path: usersEndpoint, component: PlayerProfilesComponent, pathMatch: 'full'},
      {path: artifactsEndpoint, component: ArtifactsComponent, pathMatch: 'full'},
      {path: cardsEndpoint, component: CardsComponent, pathMatch: 'full'},
      {path: charactersEndpoint, component: CharactersComponent, pathMatch: 'full'},
      {path: userProfilesEndpoint, redirectTo: usersEndpoint, pathMatch: "full"},
      {path: userProfilesEndpoint + environment.inventoryEndpoint + environment.idParameterEndpoint, component: InventoryComponent},
    ],
    // {
    //   enableTracing: true,
    // }
    ),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
