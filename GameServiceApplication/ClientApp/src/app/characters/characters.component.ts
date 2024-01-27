import {Component, OnInit} from '@angular/core';
import {IdNamePairRm} from "../artifacts/artifacts.component";
import {ActivatedRoute} from "@angular/router";
import {CharactersService} from "./characters.service";

export interface CharacterRm {
  id: number
  name: string
  description: string
  health: number
  defence: number
  attack: number
  speed: number
  rarity: number
  defaultCost: number
}

export class Character implements CharacterRm {
  id = 0
  name = ""
  description = ""
  health = 0
  defence = 0
  attack = 0
  speed = 0
  rarity = 0
  defaultCost = 0.0
}

export interface CreateCharacterRequestRm {
  name: string
  description: string
  health: number
  defence: number
  attack: number
  speed: number
  rarity: number
  defaultCost: number
}

export class CreateCharacterRequest implements CreateCharacterRequestRm {
  name = ""
  description = ""
  health = 0
  defence = 0
  attack = 0
  speed = 0
  rarity = 0
  defaultCost = 0.0
}

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  public createCharacterRequestRm: CreateCharacterRequestRm = {
    name: "Barbarian", description: "Stupid but strong", health: 10, defence: 3, attack: 8, speed: 6, rarity: 0, defaultCost: 0.0
  }

  public raritiesPairs: IdNamePairRm[] = []
  public raritiesTypeToName: {[id: number]: string} = {}
  public uniqueNameToRaritiesId: {[name: string]: number} = {}

  public entities: CharacterRm[] = [];

  constructor(public readonly cardsService: CharactersService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadAll();
    this.cardsService.init(this.route);

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
        console.log(`Removed Character`);
        this.loadAll();
      })
  }

  requestCreate(): void {
    console.log(this.createCharacterRequestRm);
    this.cardsService.postRegister(this.createCharacterRequestRm).subscribe(
      response => {
        console.log(`Created card`);
        this.loadAll();
      })
  }
}
