import type LetterProperties from '../index';

interface StatsOptions {
  os?: string;
  browser?: string;
  country?: string;
  url: string;
  start?: string;
  end?: string;
  fields?: Array<string>;
}

interface Stat {
  _id: string;
  __v: number;
  bounceRate?: string;
  subdomain?: string;
  creationDate?: string;
  totalViews?: number;
  bounces?: number;
  subscriptors?: number;
}

interface StatPost {
  _id: string;
  title: string;
  comments: number;
  thumbnail: string;
  url: string;
  views: number;
}

interface StatResponse {
  general?: Stat;

  views?: Record<string, number>;
  os?: Record<string, number>;
  browsers?: Record<string, number>;
  countries?: Record<string, number>;
  hours?: Record<string, number>;
  days?: Record<string, number>;
  dates?: Record<string, number>;
  total: number;
  growth: number;
  mostCommented?: StatPost;
  mostViewed?: StatPost;
}

class Stats {
  parent: LetterProperties;
  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  public async all(data?: StatsOptions): Promise<StatResponse> {
    return this.parent.createRequest('/stat', data);
  }
}

export default Stats;
