import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArtifactsService} from "./artifacts.service";

export interface ArtifactRm {
  id: number
  name: string
  description: string
  effectType: number
  effectStrength: number
  rarity: string
  rarityId: number
}

export class Artifact implements ArtifactRm {
  id = 0
  name = ""
  description = ""
  effectType = 0
  effectStrength = 0
  rarity = ""
  rarityId = 0
}

export interface CreateArtifactRequestRm {
  name: string
  description: string
  effectStrength: number
  effectType: number
  rarity: number
}

export class CreateArtifactRequest implements CreateArtifactRequestRm {
  name= ""
  description= ""
  effectStrength= 0
  effectType= 0
  rarity= 0
}

export class IdNamePair {
  id = 0
  name = ""
}

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent implements OnInit {
  public createArtifactRequestRm: CreateArtifactRequestRm = {
     name: "Shield", description: "Simple defence item", effectStrength: 1, effectType: 1, rarity: 0
  }

  private effectTypeToName = {}
  private uniqueNameToEffectId = {}

  public artifacts: ArtifactRm[] = [];

  constructor(public readonly artifactsService: ArtifactsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscribe();
    this.artifactsService.init(this.route);
  }

  subscribe(): void {
    this.artifactsService.getAllArtifacts()
      .subscribe(response => {
        this.artifacts = response;
      });

    this.artifactsService.getAvailableTypesDict()
      .subscribe(response => {
        this.effectTypeToName = {}
        this.uniqueNameToEffectId = {}
        // for (const p: IdNamePair in response){
        //   console.log(p)
        //   // this.effectTypeToName[p.id] = p.name;
        //   // this.uniqueNameToEffectId[`${p.id} ${p.name}`] = 0;
        // }
      });
  }

  requestCreateArtifact(): void {
    console.log(this.createArtifactRequestRm);
    this.artifactsService.postRegisterArtifact(this.createArtifactRequestRm).subscribe(
      response => {
        console.log(`Created artifact`);
      })
  }
}
