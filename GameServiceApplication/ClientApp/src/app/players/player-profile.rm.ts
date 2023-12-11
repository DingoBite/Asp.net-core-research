export interface PlayerProfileRm {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  phoneNumber: string;
  registrationDate: Date;
  hashSalt: number;
}
