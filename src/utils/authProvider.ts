import { ConfidentialClientApplication } from '@azure/msal-node';
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';

class ADAuthenticationProvider implements AuthenticationProvider {
  confidentalClientApp: ConfidentialClientApplication;
  tokenReq: any;

  constructor(options: any, tokenreq: any) {
    this.confidentalClientApp = new ConfidentialClientApplication(options);
    this.tokenReq = tokenreq;
  }

  getAccessToken(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const authResponse = await this.confidentalClientApp.acquireTokenByClientCredential(this.tokenReq);

      if (authResponse.accessToken && authResponse.accessToken.length !== 0) {
        resolve(authResponse.accessToken);
      } else {
        reject(Error('Error: cannot obtain access token.'));
      }
    });
  }
}

export default ADAuthenticationProvider;
