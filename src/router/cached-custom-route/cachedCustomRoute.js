const cache = new Map();

// create cache
export const createRouteCache = (key, value) => cache.set(key, value);

// checking if cache exist or not
export const isRouteCacheExist = (path, currentPath) => {
  if (cache.has(currentPath)) {
    return true;
  }

  let isExist = false;

  cache.keys().forEach((item) => {
    const keysArr = item.split("/").filter((item) => item.length > 0);

    const currentPathArr = currentPath
      .split("/")
      .filter((item) => item.length > 0);

    if (keysArr.length > 0 && keysArr.length === currentPathArr.length) {
      const newKeysArr = keysArr.filter((item) => !item.includes(":"));

      const isPathMatch = newKeysArr.every((item) =>
        currentPathArr.includes(item)
      );

      isExist = isPathMatch;
    }
  });

  return isExist;
};

// read cache
export const readRouteCache = (key) => cache.get(key);

// update cache
export const updateRouteCache = (key, value) => cache.set(key, value);
