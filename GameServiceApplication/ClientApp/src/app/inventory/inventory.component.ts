import {Component, OnInit} from '@angular/core';
import {IdNamePairRm, IdNameTypePair} from "../artifacts/artifacts.component";
import {CardsService} from "../cards/cards.service";
import {ActivatedRoute} from "@angular/router";
import {CardRm, CreateCardRequestRm} from "../cards/cards.component";
import {InventoryService} from "./inventory.service";

export class InventoryEntity {
  id = 0
  name = ""
  type = 0
  quantity = 0
  summaryCost = 0
}

export class IntIntPair {
  id = 0
  type = 0
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  // public itemToAddId: IntIntPair = new IntIntPair()
  // public entities: InventoryEntity[] = []
  //
  // public uniqueIdToType: {[id: string]: IdNameTypePair} = {}
  //
  constructor(public readonly cardsService: InventoryService, private route: ActivatedRoute) {
  }
  //
  // ngOnInit(): void {
  //   this.loadAll();
  //   this.cardsService.init(this.route);
  // }
  //
  // loadAll(): void {
  //   this.cardsService.getAll()
  //     .subscribe(response => {
  //       this.entities = response;
  //       this.uniqueIdToType = {}
  //       console.log(response)
  //       response.forEach(p => {
  //         const pair = new IdNameTypePair()
  //         pair.name = p.name
  //         pair.id = p.id
  //         pair.type = p.type
  //         this.uniqueIdToType[`${p.id}___${p.type}`] = pair;
  //       })
  //     });
  // }
  //
  // requestRemove(id: number, type: number): void {
  //   this.cardsService.postRemove(this.uniqueIdToType[`${id}___${type}`]).subscribe(
  //     response => {
  //       console.log(`Removed Card`);
  //       this.loadAll();
  //     })
  // }
  //
  // requestAdd(): void {
  //   this.cardsService.postAdd(this.itemToAddId).subscribe(
  //     response => {
  //       console.log(`Created card`);
  //       this.loadAll();
  //     })
  // }
}
