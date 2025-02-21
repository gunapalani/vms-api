export enum Claims {
  gameActionView = 1,
  gameActionModify = 2,
  privilegeStageView = 4,
  privilegeStageModify = 8,
  userView = 16,
  userModify = 32,
  leaderboardView = 64,
  rewardView = 128,
  rewardModify = 256,
  redeemView = 512,
  redeemModify = 1024,
  webhookView = 2048,
  webhookModify = 4096,
  projectModify = 8192,
  applicationModify = 16384,
  projectView = 32768,
  applicationView = 65536,
  adminPageAccess = 131072,
  superAdminPageAccess = 262144,
  applicationUserAccess = 524288,
  npmAccess = 1048576,
  sandboxAccess = 2097152,
}

export class Role {
  name: string;
  _id: string;
  claims;
  description: string;
  constructor(role) {
    const claims = Object.keys(Claims).filter(key => !isNaN(Number(Claims[key])));
    this.name = role.name;
    this._id = role._id;
    this.description = role.description;
    this.claims = claims.map((_c, i) => {
      const claim = Claims[claims[i]];
      return {
        checked: (role.claims & claim) === claim,
        value: claim,
      };
    });
  }
}
