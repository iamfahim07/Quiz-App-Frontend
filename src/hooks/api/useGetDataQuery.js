import {
  createCache,
  isCacheExist,
  readCache,
} from "./cached-api-data/cachedAPIData";

export default function useGetDataQuery(
  queryString,
  { redirectFunc = () => {} } = {}
) {
  const url = `${import.meta.env.VITE_SERVER_BASE_URL}/${queryString}`;

  if (!isCacheExist(url)) {
    createCache(url, getData(url, redirectFunc));
  }

  return readCache(url);
}

async function getData(url, redirectFunc) {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok && response.status === 401) {
    const newToken = await redirectFunc();

    return newToken?.userName ? newToken : {};
  }

  if (!response.ok && response.status !== 401) {
    return [];
  }

  return result.data;
}
