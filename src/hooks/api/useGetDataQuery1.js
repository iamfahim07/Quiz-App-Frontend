import {
  // cache,
  isCacheExist,
  createCache,
  readCache,
} from "./cached-api-data/cachedAPIData";

// let cache = new Map();

export default function useGetDataQuery1(queryString) {
  const url = `${import.meta.env.VITE_SERVER_BASE_URL}/${queryString}`;

  // console.log(!cache.has(url));
  // console.log(!isCacheExist(url));

  if (!isCacheExist(url)) {
    createCache(url, getData(url));
  }

  return readCache(url);
}

async function getData(url) {
  const response = await fetch(url);

  const result = await response.json();

  if (!response.ok) {
    return [];
  }

  // console.log(result.data);

  return result.data;
}
