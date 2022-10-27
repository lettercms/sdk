interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: string;
  reauthorize_required_in: string;
  signedRequest: string;
  userID: string;
}

export interface PagesResponse {
  data: Array<Record<string, string | number>>;
}
export interface FacebookResponse {
  status: 'connected' | 'not_authorized' | 'unknown';
  authResponse: FacebookAuthResponse;
}
export interface FacebookScope {
  scope: string;
}

interface FacebookImage {
  id: string;
  created_time: string;
}

export interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  image: Array<FacebookImage>;
}
