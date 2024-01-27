import {Component, OnInit} from '@angular/core';
import {ArtifactsService} from "../artifacts/artifacts.service";
import {ActivatedRoute} from "@angular/router";
import {ArtifactRm, CreateArtifactRequestRm, IdNamePairRm} from "../artifacts/artifacts.component";
import {CardsService} from "./cards.service";

export interface CardRm {
  id: number
  name: string
  description: string
  abilityType: number
  rarity: number
  defaultCost: number
}

export class Card implements CardRm {
  id = 0
  name = ""
  description = ""
  abilityType = 0
  rarity = 0
  defaultCost = 0.0
}

export interface CreateCardRequestRm {
  name: string
  description: string
  abilityType: number
  rarity: number
  defaultCost: number
}

export class CreateCardRequest implements CreateCardRequestRm {
  name = ""
  description = ""
  abilityType = 0
  rarity = 0
  defaultCost = 0.0
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public createCardRequestRm: CreateCardRequestRm = {
    name: "Fireball", description: "Magic trick", abilityType: 1, rarity: 0, defaultCost: 0.0
  }

  public effectTypePairs: IdNamePairRm[] = []
  public effectTypeToName: {[id: number]: string} = {}
  public uniqueNameToEffectId: {[name: string]: number} = {}

  public raritiesPairs: IdNamePairRm[] = []
  public raritiesTypeToName: {[id: number]: string} = {}
  public uniqueNameToRaritiesId: {[name: string]: number} = {}

  public entities: CardRm[] = [];

  constructor(public readonly cardsService: CardsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadAll();
    this.cardsService.init(this.route);

    this.cardsService.getAvailableTypesDict()
      .subscribe(response => {
        this.effectTypePairs = response;
        this.effectTypeToName = {}
        this.uniqueNameToEffectId = {}
        console.log(response)
        response.forEach(p => {
          this.effectTypeToName[p.id] = p.name;
          this.uniqueNameToEffectId[`${p.id} ${p.name}`] = 0;
        })
      });

    this.cardsService.getAvailableRaritiesDict()
      .subscribe(response => {
        this.raritiesPairs = response;
        this.raritiesTypeToName = {}
        this.uniqueNameToRaritiesId = {}
        console.log(response)
        response.forEach(p => {
          this.raritiesTypeToName[p.id] = p.name;
          this.uniqueNameToRaritiesId[`${p.id} ${p.name}`] = 0;
        })
      });
  }

  loadAll(): void {
    this.cardsService.getAll()
      .subscribe(response => {
        this.entities = response;
      });
  }

  requestRemove(id: number): void {
    this.cardsService.postRemove(id).subscribe(
      response => {
        console.log(`Removed Card`);
        this.loadAll();
      })
  }

  requestCreate(): void {
    console.log(this.createCardRequestRm);
    this.cardsService.postRegister(this.createCardRequestRm).subscribe(
      response => {
        console.log(`Created card`);
        this.loadAll();
      })
  }
}
