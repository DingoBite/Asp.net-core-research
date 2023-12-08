import {Component, OnInit} from '@angular/core';
import {PlayerProfilesService} from "./player-profiles.service";
import {PlayerProfileRm} from "./player-profile.rm";

export class SearchParameters{
  public email = "";
  public fromDate = new Date();
  public id = 0;
  public name = "";
  public phoneNumber = "";
  public toDate = new Date();
}

@Component({
  selector: 'app-players',
  templateUrl: './player-profiles.component.html',
  styleUrls: ['./player-profiles.component.css']
})
export class PlayerProfilesComponent implements OnInit{

  public searchResultPlayers: PlayerProfileRm[] = [];
  public searchParameters: SearchParameters = new SearchParameters();

  constructor(private playerProfilesService: PlayerProfilesService) {}

  ngOnInit(): void {
  }

  search(): void {
    console.log(this.searchParameters)
    this.playerProfilesService.searchPlayers(this.searchParameters)
      .subscribe(response => {
        this.searchResultPlayers = response;
    });
  }

  test(): void {
    this.playerProfilesService.getAllPlayerProfiles()
      .subscribe(response => {
        this.searchResultPlayers = response;
      });
  }
  // public searchResultPlayers: PlayerProfileRm[] = [
  //   {
  //     id: 101,
  //     email: "alex.smith@example.com",
  //     passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
  //     name: "Alex Smith",
  //     phoneNumber: "555-0101",
  //     dateOfRegistration: "2022-05-15",
  //   },
  //   {
  //     id: 102,
  //     email: "jordan.lee@example.com",
  //     passwordHash: "7c6a180b36896a0a8c02787eeafb0e4c",
  //     name: "Jordan Lee",
  //     phoneNumber: "555-0202",
  //     dateOfRegistration: "2022-06-20",
  //   },
  //   {
  //     id: 103,
  //     email: "sam.taylor@example.com",
  //     passwordHash: "e99a18c428cb38d5f260853678922e03",
  //     name: "Sam Taylor",
  //     phoneNumber: "555-0303",
  //     dateOfRegistration: "2022-07-10",
  //   },
  //   {
  //     id: 104,
  //     email: "casey.reyes@example.com",
  //     passwordHash: "25f9e794323b453885f5181f1b624d0b",
  //     name: "Casey Reyes",
  //     phoneNumber: "555-0404",
  //     dateOfRegistration: "2022-08-05",
  //   },
  //   {
  //     id: 105,
  //     email: "morgan.bailey@example.com",
  //     passwordHash: "3dbde6670a7b953d289b7e6f120aee56",
  //     name: "Morgan Bailey",
  //     phoneNumber: "555-0505",
  //     dateOfRegistration: "2022-09-15",
  //   },
  //   {
  //     id: 106,
  //     email: "riley.jordan@example.com",
  //     passwordHash: "0d107d09f5bbe40cade3de5c71e9e9b7",
  //     name: "Riley Jordan",
  //     phoneNumber: "555-0606",
  //     dateOfRegistration: "2022-10-01",
  //   },{
  //     id: 107,
  //     email: "taylor.kim@example.com",
  //     passwordHash: "3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p",
  //     name: "Taylor Kim",
  //     phoneNumber: "555-0707",
  //     dateOfRegistration: "2023-01-12",
  //   },
  //   {
  //     id: 108,
  //     email: "chris.parker@example.com",
  //     passwordHash: "4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q",
  //     name: "Chris Parker",
  //     phoneNumber: "555-0808",
  //     dateOfRegistration: "2023-02-08",
  //   },
  //   {
  //     id: 109,
  //     email: "drew.morgan@example.com",
  //     passwordHash: "5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r",
  //     name: "Drew Morgan",
  //     phoneNumber: "555-0909",
  //     dateOfRegistration: "2023-03-15",
  //   },
  //   {
  //     id: 110,
  //     email: "jamie.lee@example.com",
  //     passwordHash: "6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s",
  //     name: "Jamie Lee",
  //     phoneNumber: "555-1010",
  //     dateOfRegistration: "2023-04-20",
  //   },
  //   {
  //     id: 111,
  //     email: "quinn.bailey@example.com",
  //     passwordHash: "7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t",
  //     name: "Quinn Bailey",
  //     phoneNumber: "555-1111",
  //     dateOfRegistration: "2023-05-25",
  //   },
  //   {
  //     id: 112,
  //     email: "jordan.casey@example.com",
  //     passwordHash: "8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u",
  //     name: "Jordan Casey",
  //     phoneNumber: "555-1212",
  //     dateOfRegistration: "2023-06-01",
  //   },
  //
  // ];
}
