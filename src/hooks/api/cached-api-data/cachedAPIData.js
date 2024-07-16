const cache = new Map();

// checking if cache exist or not
export const isCacheExist = (key) => cache.has(key);

// create cache
export const createCache = (key, value) => cache.set(key, value);

// read cache
export const readCache = (key) => cache.get(key);

// update cache
export const reserveUpdateCache = (key, value) => {
  if (!cache.has(key)) {
    cache.set(key, value); // Initialize with an empty array if the key doesn't exist
  }

  // get the promise
  const promise = cache.get(key);

  // const updatedValue = [...promise.value, value];

  // const updatedPromise = Promise.resolve(updatedValue);

  // checking if the value of the promise is Array
  if (Array.isArray(promise.value)) {
    // const updatedValue = [...promise.value, value];

    let updatedValue = [];

    if (Array.isArray(value)) {
      updatedValue = [...value];
    } else {
      // filtering out already exist value
      const filterExistingValue = promise.value.filter(
        (val) => val._id !== value._id
      );

      updatedValue = [...filterExistingValue, value];
    }

    // const updatedValue = [...value];

    // const updatedPromise = Promise.resolve(updatedValue);
    const updatedPromise = async (updatedValue) => updatedValue;

    cache.set(key, updatedPromise(updatedValue));

    // promise.value = updatedValue;

    return updatedValue;
  } else {
    let newValue = [];

    if (Array.isArray(value)) {
      newValue = [...value];
    } else {
      newValue = [value];
    }

    // const newValue = [...value];

    const updatedPromise = async (newValue) => newValue;

    cache.set(key, updatedPromise(newValue));

    return newValue;
  }
};

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
      // filtering out already exist value
      const filterExistingValue = promise.value.filter(
        (val) => val._id !== value._id
      );

      updatedValue = [...filterExistingValue, value];
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
  // const currentValue = cache.get(key);
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
