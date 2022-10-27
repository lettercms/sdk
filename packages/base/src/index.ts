import existsRequest from './lib/utils/existsRequest';

import Accounts from './lib/Accounts';
import Blogs from './lib/Blogs';
import Comments from './lib/Comments';
import Images from './lib/Images';
import Invitations from './lib/Invitations';
import Pages from './lib/Pages';
import Posts from './lib/Posts';
import Social from './lib/Social';
import Stats from './lib/Stats';
import Users from './lib/Users';

export type Letter = LetterSdk;

export default class LetterSdk {
  accessToken?: string;
  endpoint: string;

  accounts: Accounts;
  blogs: Blogs;
  comments: Comments;
  images: Images;
  invitations: Invitations;
  pages: Pages;
  posts: Posts;
  social: Social;
  stats: Stats;
  users: Users;
  createRequest: Function;

  constructor(accessToken?: string) {
    this.endpoint = process.env.LETTERCMS_ENDPOINT as string;

    this.accessToken = accessToken;

    this.accounts = new Accounts(this);
    this.blogs = new Blogs(this);
    this.comments = new Comments(this);
    this.images = new Images(this);
    this.invitations = new Invitations(this);
    this.pages = new Pages(this);
    this.posts = new Posts(this);
    this.social = new Social(this);
    this.stats = new Stats(this);
    this.users = new Users(this);

    //Prevent to error "Cannot call undefined functions error on TS"
    this.createRequest = () => null;
  }
  static async existsSubdomain(subdomain: string): Promise<boolean> {
    try {
      return existsRequest('blog', {
        subdomain,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async existsAccount(condition: object): Promise<boolean> {
    try {
      return existsRequest('account', condition);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async existsPage(condition: object): Promise<boolean> {
    try {
      return existsRequest('page', condition);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async existsPost(condition: object): Promise<boolean> {
    try {
      return existsRequest('post', condition);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async existsUser(condition: object): Promise<boolean> {
    try {
      return existsRequest('user', condition);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
