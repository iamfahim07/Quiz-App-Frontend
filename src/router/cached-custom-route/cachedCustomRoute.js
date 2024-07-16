const cache = new Map();

// checking if cache exist or not
export const isRouteCacheExist = (key) => cache.has(key);

// create cache
export const createRouteCache = (key, value) => cache.set(key, value);

// read cache
export const readRouteCache = (key) => cache.get(key);

// update cache
export const updateRouteCache = (key, value) => cache.set(key, value);
