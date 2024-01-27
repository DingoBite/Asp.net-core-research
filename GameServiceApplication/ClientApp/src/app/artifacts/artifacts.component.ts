import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArtifactsService} from "./artifacts.service";

export interface ArtifactRm {
  id: number
  name: string
  description: string
  effectType: number
  effectStrength: number
  rarityId: number
  defaultCost: number
}

export class Artifact implements ArtifactRm {
  id = 0
  name = ""
  description = ""
  effectType = 0
  effectStrength = 0
  rarityId = 0
  defaultCost = 0.0
}

export interface CreateArtifactRequestRm {
  name: string
  description: string
  effectStrength: number
  effectType: number
  rarity: number
  defaultCost: number
}

export class CreateArtifactRequest implements CreateArtifactRequestRm {
  name = ""
  description = ""
  effectStrength = 0
  effectType = 0
  rarity = 0
  defaultCost = 0.0
}

export interface IdNamePairRm {
  id: number
  name: string
}

export class IdNamePair implements IdNamePairRm{
  id = 0
  name = ""
}

export interface IdNameTypePairRm {
  id: number
  name: string
  type: number
}

export class IdNameTypePair implements IdNameTypePairRm {
  id = 0
  name = ""
  type = 0
}

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent implements OnInit {
  public createArtifactRequestRm: CreateArtifactRequestRm = {
     name: "Shield", description: "Simple defence item", effectStrength: 1, effectType: 1, rarity: 0, defaultCost: 0.0
  }

  public effectTypePairs: IdNamePairRm[] = []
  public effectTypeToName: {[id: number]: string} = {}
  public uniqueNameToEffectId: {[name: string]: number} = {}

  public raritiesPairs: IdNamePairRm[] = []
  public raritiesTypeToName: {[id: number]: string} = {}
  public uniqueNameToRaritiesId: {[name: string]: number} = {}

  public artifacts: ArtifactRm[] = [];

  constructor(public readonly artifactsService: ArtifactsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadAll();
    this.artifactsService.init(this.route);

    this.artifactsService.getAvailableTypesDict()
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

    this.artifactsService.getAvailableRaritiesDict()
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
    this.artifactsService.getAll()
      .subscribe(response => {
        this.artifacts = response;
      });
  }

  requestRemove(id: number): void {
    this.artifactsService.postRemove(id).subscribe(
      response => {
        console.log(`Removed artifact`);
        this.loadAll();
      })
  }

  requestCreate(): void {
    console.log(this.createArtifactRequestRm);
    this.artifactsService.postRegister(this.createArtifactRequestRm).subscribe(
      response => {
        console.log(`Created artifact`);
        this.loadAll();
      })
  }
}
