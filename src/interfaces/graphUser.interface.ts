export interface PasswordProfile {
  password: string;
  forceChangePasswordNextSignIn: boolean;
  forceChangePasswordNextSignInWithMfa: boolean;
}

export interface ObjectIdentity {
  signInType: string;
  issuer: string;
  issuerAssignedId;
}

export interface GraphUser {
  id?: string;
  displayName: string;
  identities: ObjectIdentity[];
  accountEnabled: boolean;
  passwordPolicies: string;
  passwordProfile: PasswordProfile;
}

export interface B2CUser {
  id: string;
  name: string;
  phoneNumber: string;
  constituencyNumber: string;
  appName: string;
  claims: number;
}
