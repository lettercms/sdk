import type LetterProperties from '../index';
import {RequestOptions, ListResponseMessage} from '../types';

class Images {
  parent: LetterProperties;

  constructor(parent: LetterProperties) {
    this.parent = parent;
  }
  //TODO: add type definition to all output
  async all(
    options?: RequestOptions
  ): Promise<ListResponseMessage<Record<string, string>>> {
    return this.parent.createRequest('/image', options);
  }
  //TODO: add type definition to single output
  async single(
    name: string,
    options?: RequestOptions
  ): Promise<Record<string, string>> {
    return this.parent.createRequest(`/image/${name}`, options);
  }
  async delete(id: string): Promise<Record<string, string>> {
    return this.parent.createRequest(`/image/${id}`, 'DELETE');
  }
}

export default Images;
