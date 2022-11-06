import type LetterProperties from '../../index';
import {PublishOptions} from '../Social';

class Base<feed, post> {
  url: string;
  parent: LetterProperties;
  constructor(url: string, parent: LetterProperties) {
    this.url = url;
    this.parent = parent;
  }
  all(): Promise<feed> {
    return this.parent.createRequest(`/social/${this.url}`);
  }
  publish(message: string, options?: PublishOptions): Promise<string> {
    return this.parent.createRequest(`/social/${this.url}/publish`, 'POST', {
      message,
      ...options,
    });
  }
  /*
  single(id: string, options?): Promise<post> {
    return this.parent.createRequest(`/social/${this.url}/${id}`, options);
  }
  update(id: string, message: string, options?): Promise<void> {
    return this.parent.createRequest(`/social/${this.url}/${id}`, "PATCH", {
      message,
      ...options,
    });
  }
  delete(id: string): Promise<void> {
    return this.parent.createRequest(`/social/${this.url}/${id}`, "DELETE");
  }*/
}

export default Base;
