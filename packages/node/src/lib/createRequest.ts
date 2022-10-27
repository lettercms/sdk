import toQuery from '@lettercms/base/dist/lib/utils/objectToQueryString';
import {request} from 'https';
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
  path: string;
  headers: Headers;
  method: string;
  hostname: string;
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
  let body: unknown = null;

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

    if (data) {
      body = JSON.stringify(data);

      headers['Content-Length'] = Buffer.byteLength(body as string);
    }
  }

  const options: RequestOptions = {
    hostname: process.env.LETTERCMS_ENDPOINT as string,
    path: path + query,
    method: method as string,
    headers,
  };

  return new Promise((resolve, reject) => {
    const req = request(options, res => {
      let chunks = '';

      res.setEncoding('utf8');

      res.on('data', (chunk: Buffer) => {
        chunks += chunk.toString();
      });

      res.on('end', () => resolve(JSON.parse(chunks)));

      res.on('error', reject);
    });

    req.on('error', reject);

    if (body) {
      // Write data to request body
      req.write(body);
      req.end();
    }
  });
}

export default createRequest;
