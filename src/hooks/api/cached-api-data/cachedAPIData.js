const cache = new Map();

// checking if cache exist or not
export const isCacheExist = (key) => cache.has(key);

// create cache
export const createCache = (key, value) => cache.set(key, value);

// read cache
export const readCache = (key) => cache.get(key);

// update cache
export const updateCache = (key, value) => {
  if (!cache.has(key)) {
    cache.set(key, value); // Initialize with an empty array if the key doesn't exist
  }

  // get the promise
  const promise = cache.get(key);

  // checking if the value of the promise is Array
  if (Array.isArray(promise.value)) {
    let updatedValue = [];

    if (Array.isArray(value)) {
      updatedValue = [...value];
    } else {
      const isUpdatedValue = promise.value.some(
        (existingValue) => existingValue._id === value._id
      );

      if (isUpdatedValue) {
        // updating with the new updated value
        const newValue = promise.value.map((existingValue) => {
          if (existingValue._id === value._id) {
            return value;
          } else {
            return existingValue;
          }
        });

        updatedValue = newValue;
      } else {
        // adding new value
        const existingValue = promise.value;

        updatedValue = [...existingValue, value];
      }
    }

    const updatedPromise = async (updatedValue) => updatedValue;

    cache.set(key, updatedPromise(updatedValue));

    return updatedValue;
  } else {
    let updatedValue = value;

    const updatedPromise = async (updatedValue) => updatedValue;

    cache.set(key, updatedPromise(updatedValue));

    return updatedValue;
  }
};

// delete cache
export const deleteCache = (key, id) => {
  const promise = cache.get(key);

  if (Array.isArray(promise.value)) {
    const updatedValue = promise.value.filter((val) => val._id !== id);

    const updatedPromise = async (updatedValue) => updatedValue;

    cache.set(key, updatedPromise(updatedValue));

    return updatedValue;
  }
};

// delete key and value element
export const deleteElement = (key) => {
  cache.delete(key);
};
