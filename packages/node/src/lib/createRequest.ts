import toQuery from '@lettercms/base/dist/lib/utils/objectToQueryString';
import axios from 'axios';
import {
  RequestOptions as LetterCMSOptions,
  PostRequestOptions,
  AccountRequestOptions,
} from '@lettercms/base/dist/types';
import type {Letter} from '../index';

type Request = LetterCMSOptions | PostRequestOptions | AccountRequestOptions;

interface ToQuery {
  [key: string]: string | Array<string>;
}

type Headers = Record<string, string | number>;

interface RequestOptions {
  url: string;
  headers: Headers;
  method: string;
  data?: Request;
}

async function createRequest(
  this: Letter,
  path: string,
  method?: string | Request,
  data?: Request
): Promise<object> {
  if (!this.clientID || !this.clientSecret)
    throw new Error('Credential must be provided');

  const hasNotMethod = typeof method === 'object' && !data;

  const dataParam = hasNotMethod ? method : data;

  const methodParam = hasNotMethod ? 'GET' : method;

  const isGet = methodParam === 'GET';

  let query = '';

  const headers: Headers = {
    'x-lettercms-id': this.clientID,
    'x-lettercms-secret': this.clientSecret,
  };

  let newData: ToQuery = {};

  if (isGet && !!dataParam) {
    if (Array.isArray(dataParam))
      newData = {
        fields: dataParam.join(','),
      };
    else {
      newData = dataParam as ToQuery;

      if (newData.fields)
        newData.fields =
          typeof newData.fields === 'string'
            ? newData.fields
            : newData.fields.join(',');
    }

    query = toQuery(newData);
  }

  if (!isGet) {
    headers['Content-Type'] = 'application/json';

    if (data)
      headers['Content-Length'] = Buffer.byteLength(
        JSON.stringify(data) as string
      );
  }

  const options: RequestOptions = {
    url: `${this.endpoint}/api${path}${query}`,
    method: methodParam as string,
    headers,
    data,
  };

  const {data: dataRes} = await axios(options);

  return dataRes as Record<string, unknown>;
}

export default createRequest;
