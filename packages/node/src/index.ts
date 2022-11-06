import Base from '@lettercms/base';
import createRequest from './lib/createRequest';

declare interface InitOptions {
  id: string;
  secret: string;
}

declare interface AccessTokenResponse {
  accessToken?: string;
  status?: string;
  message?: string;
}

declare interface AccessTokenOptions {
  expiresIn?: string | number;
}

class NodeSDK extends Base {
  clientID?: string;
  clientSecret?: string;
  createRequest: Function;
  constructor() {
    super();

    this.clientID = '';
    this.clientSecret = '';
    this.createRequest = createRequest.bind(this);
  }
  init(opts: InitOptions): void {
    this.clientSecret = opts.secret;
    this.clientID = opts.id;
  }
  getAccessToken(
    opts: AccessTokenOptions = {expiresIn: 3600}
  ): Promise<AccessTokenResponse> {
    return this.createRequest('/auth/exchangeToken', 'POST', opts);
  }
}

let sdk = null;

declare namespace global {
  let __lettercms_sdk: Letter;
}

//Cache function
if ('__lettercms_sdk' in global) sdk = global.__lettercms_sdk;
else global.__lettercms_sdk = sdk = new NodeSDK();

export type Letter = NodeSDK;
export default sdk;
