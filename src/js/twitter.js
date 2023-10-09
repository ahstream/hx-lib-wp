/**
 * Copyright (c) 2021-
 * Utility functions for Twitter.
 */

import { getSearchParam } from './web.js';
import { onlyNumbers } from './string.js';

export function extractTwitterHandle(url) {
  if (!url) {
    return '';
  }

  const screenName = getSearchParam(url, 'screen_name');
  if (screenName) {
    return screenName;
  }

  const match = url.match(/^(?:https?:)?(?:\/\/)?(www\.)?(twitter|x).com\/@?(?<handle>\w+)/);
  return match?.groups?.handle ? `${match.groups.handle}` : '';
}

export function extractTweetId(url) {
  if (!url) {
    return '';
  }

  const id = getSearchParam(url, 'tweet_id');
  if (id) {
    return id;
  }

  // https://twitter.com/yangbis76/status/1709019523683328231
  const match = url.match(/^(?:https?:)?(?:\/\/)?(www\.)?(twitter|x).com\/@?(?<handle>\w+)\/status\/@?(?<id>\w+)/);
  return match?.groups?.id ? `${match.groups.id}` : '';
}

export function makeTwitterURL(handle) {
  return `https://twitter.com/${handle}`;
}

export function convertTwitterSnowflakeToDate(snowflake) {
  const TWITTER_EPOCH = 1288834974657;
  return new Date(Number(snowflake) / 4194304 + TWITTER_EPOCH);
}

export function makeTwitterFollowIntentUrl(url) {
  if (url.includes('/intent/follow') || url.includes('/intent/user')) {
    return url;
  }
  const val = extractTwitterHandle(url);
  const key = onlyNumbers(val) ? 'user_id' : 'screen_name';
  return `https://twitter.com/intent/user?${key}=${val}`;
}

// https://twitter.com/yangbis76/status/1709019523683328231
// https://twitter.com/intent/retweet?utm_source=alphabot.app&tweet_id=1710376441869672482
export function makeTwitterRetweetIntentUrl(url) {
  if (url.includes('/intent/retweet')) {
    return url;
  }
  const id = extractTweetId(url);
  return `https://twitter.com/intent/retweet?tweet_id=${id}`;
}

// https://twitter.com/yangbis76/status/1709019523683328231
// https://twitter.com/intent/retweet?utm_source=alphabot.app&tweet_id=1710376441869672482
export function makeTwitterLikeIntentUrl(url) {
  if (url.includes('/intent/like')) {
    return url;
  }
  const id = extractTweetId(url);
  return `https://twitter.com/intent/like?tweet_id=${id}`;
}

export function isTwitterLink(url) {
  if (!url?.match) {
    return false;
  }
  if (url.match(/https:\/\/(?:www\.)?twitter.com\/(#!\/)?(\w*)/i)) {
    return true;
  }
  if (url.match(/https:\/\/(?:www\.)?x.com\/(#!\/)?(\w*)/i)) {
    return true;
  }
  return false;
}

export function isTwitterURL(url) {
  if (!url?.match) {
    return false;
  }
  if (url.match(/(?:www\.)?twitter.com\//i)) {
    return true;
  }
  if (url.match(/(?:www\.)?x.com\//i)) {
    return true;
  }
  return false;
}
