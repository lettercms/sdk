import type LetterProperties from '../index';
import {RequestOptions, ListResponseMessage} from '../types';

class Comments {
  parent: LetterProperties;

  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  async all(
    postID: string,
    options?: RequestOptions
  ): Promise<ListResponseMessage<Record<string, string>>> {
    return this.parent.createRequest(`/comment/${postID}`, options);
  }
  async post(
    id: string,
    options?: RequestOptions
  ): Promise<Record<string, string>> {
    return this.parent.createRequest(`/comment/${id}`, options);
  }
  async send(
    comment: string,
    postID: string,
    userID: string
  ): Promise<Record<string, string>> {
    return this.parent.createRequest('/comment', 'POST', {
      comment,
      postID,
      userID,
    });
  }
  async replyTo(
    comment: string,
    replyTo: string,
    postID: string,
    userID: string
  ): Promise<Record<string, string>> {
    return this.parent.createRequest(`/comment/${replyTo}`, 'POST', {
      comment,
      postID,
      userID,
    });
  }
  async delete(id: string): Promise<Record<string, string>> {
    return this.parent.createRequest(`/comment/${id}`, 'DELETE');
  }
}

export default Comments;
