import toQuery from './objectToQueryString';

export default async function (
  path: string,
  conditions: object
): Promise<boolean> {
  const query = toQuery(conditions);
  const host = process.env.LETTERCMS_ENDPOINT;

  try {
    //TODO: Add isomorphic implementation
    // eslint-disable-next-line
    //@ts-ignore
    const res = await fetch(`${host}/${path}/exists${query}`);
    if (res.status === 404) return Promise.resolve(false);

    return Promise.resolve(true);
  } catch (err) {
    return Promise.resolve(false);
  }
}
