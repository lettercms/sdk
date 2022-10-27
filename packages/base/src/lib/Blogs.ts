import type LetterProperties from '../index';
import {RequestOptions} from '../types';

interface Category {
  name: string;
  alias: string;
}

interface Blog {
  subdomain?: string;
  customDomain?: string;
  plan?: 'beta' | 'free' | 'pro';
  isVisible?: boolean;
  hasCustomRobots?: boolean;
  robots?: string;
  lastPayment?: string;
  ownerEmail?: string;
  url?: string;
  categories?: Array<Category>;
  mainUrl?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

interface BlogResponse extends Blog {
  _id: string;
}
interface Usage {
  used: number;
  available: number;
}

interface UsageResponse {
  posts: {
    versioning: Usage;
  };
  files: {
    storage: Usage;
    upload: Usage;
  };
  pages: Usage;
  social: {
    schedule: Usage;
    instagramPosts: Usage;
    accounts: number;
  };
  accounts: {
    collaborators: number;
    single: number;
  };
  ab: {
    tests: Usage;
  };
  stats: {
    realtimeEnabled: number;
    reports: number;
  };
  emails: {
    campaigns: number;
  };
}

class Blogs {
  parent: LetterProperties;

  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async data(data?: RequestOptions): Promise<BlogResponse> {
    return this.parent.createRequest('/blog', data);
  }
  async update(data: Blog): Promise<void> {
    return this.parent.createRequest('/blog', 'PATCH', data);
  }
  usage(): Promise<UsageResponse> {
    return this.parent.createRequest('/usage');
  }
}

export default Blogs;
