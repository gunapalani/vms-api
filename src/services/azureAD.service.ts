import 'isomorphic-fetch';
import { Client, ClientOptions } from '@microsoft/microsoft-graph-client';
import ADAuthenticationProvider from '@/utils/authProvider';
import { CreateUserDto } from '@/dtos/users.dto';
import { CONFIG } from '@/environment/environment.appSettings';
import { User } from '@/interfaces/users.interface';
import { GraphUser, ObjectIdentity, PasswordProfile } from '@/interfaces/graphUser.interface';

export class AzureADService {
  public client: Client;

  createUser = async (user: User) => {
    const client = this.getGraphClient();
    const _user = this.createBuildContext(user);
    const response = await client.api('/users').post(_user);
    return response.id;
  };

  updateUser = async (user: CreateUserDto, userId: string) => {
    const client = this.getGraphClient();
    const _user = this.createBuildContext(user, true);
    const response = await client.api(`/users/${userId}`).update(_user);
    return response;
  };

  deleteUser = async (userId: string) => {
    const client = this.getGraphClient();
    await client.api(`/users/${userId}`).delete();
    return true;
  };

  getGraphClient = () => {
    const clientOptions: ClientOptions = {
      authProvider: new ADAuthenticationProvider(CONFIG.msalConfig, CONFIG.tokenRequest),
    };
    return Client.initWithMiddleware(clientOptions);
  };

  createBuildContext(user: User, _isUpdate = false) {
    const graphUser = {} as GraphUser;
    graphUser.displayName = user.userName;
    graphUser.identities = [];
    const identity = {} as ObjectIdentity;
    identity.signInType = 'phoneNumber';
    identity.issuer = CONFIG.B2C_DOMAIN;
    identity.issuerAssignedId = `+91${user.phoneNumber}`;
    graphUser.identities.push(identity);
    if (!_isUpdate) {
      graphUser.accountEnabled = true;
      graphUser.passwordPolicies = CONFIG.B2C_PASSWORD_POLICY;
      graphUser.passwordProfile = {
        password: CONFIG.B2C_PASSWORD,
        forceChangePasswordNextSignIn: false,
        forceChangePasswordNextSignInWithMfa: false,
      } as PasswordProfile;
    }
      return graphUser;
  }
}
