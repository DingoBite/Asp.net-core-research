export interface PlayerProfileRm {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  phoneNumber: string;
  registrationDate: Date;
  hashSalt: number;
}

class PlayerProfile implements PlayerProfileRm {
  public static readonly NONE_EMAIL = "[none_email]";
  public static readonly NONE_HASH = "[none_hash]";
  public static readonly NONE_NAME = "[none_name]";
  public static readonly NONE_PHONE_NUMBER = "[none_phone_number]";

  readonly id = -1;
  readonly email = PlayerProfile.NONE_EMAIL;
  readonly passwordHash = PlayerProfile.NONE_HASH;
  readonly name = PlayerProfile.NONE_NAME;
  readonly phoneNumber = PlayerProfile.NONE_PHONE_NUMBER;
  readonly registrationDate = new Date();
  readonly hashSalt = 0;
}
