export interface PlayerProfileRm {
  playerId: number;
  email: string;
  passwordHash: string;
  name: string;
  phoneNumber: string;
  registrationDate: Date;
  hashSalt: number;
}

export class PlayerProfile implements PlayerProfileRm {
  email = "";
  hashSalt = 0;
  name = "";
  passwordHash = "";
  phoneNumber = "";
  playerId = -1;
  registrationDate = new Date();
}
