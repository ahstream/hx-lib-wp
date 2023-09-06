/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

// todo: rename hashData -> hashArgs in consumer

export function createHashArgs(hashPartOfURL) {
  const hashArgs = {};
  if (typeof hashPartOfURL === 'string') {
    hashPartOfURL
      .replace('#', '')
      .split('&')
      .map((x) => x.split('=', 2))
      .forEach((kv) => {
        if (!kv || kv.length !== 2 || !kv[0]) {
          // console.log('Skip badly formatted hash:', kv);
          return;
        }
        if (typeof hashArgs[kv[0]] === 'undefined') {
          hashArgs[kv[0]] = [];
        }
        hashArgs[kv[0]].push(kv[1]);
      });
  }
  return {
    hashArgs,
    get: (key) => {
      return key && hashArgs[key] ? hashArgs[key] : null;
    },
    getOne: (key) => {
      return key && hashArgs[key] && hashArgs[key].length ? hashArgs[key][0] : null;
    },
    has: (key, val) => {
      return key && hashArgs[key] ? hashArgs[key].includes(val) : false;
    },
    addToUrl: (key, val, url) => {
      return url + (url.includes('#') ? `&${key}=${val}` : `#${key}=${val}`);
    },
  };
}
