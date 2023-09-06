/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { createHashArgs } from './hashArgs';

test('createHashArgs', () => {
  const hashUrlPart = '#foo=bar&id=1&id=2';

  const hashArgs = createHashArgs(hashUrlPart);
  expect(hashArgs.get('foo')).toEqual(['bar']);
  expect(hashArgs.getOne('foo')).toEqual('bar');
  expect(hashArgs.get('id')).toEqual(['1', '2']);
  expect(hashArgs.getOne('id')).toEqual('1');
  expect(hashArgs.get('abc')).toEqual(null);
  expect(hashArgs.getOne('abc')).toEqual(null);
  expect(hashArgs.has('foo', 'bar')).toEqual(true);
  expect(hashArgs.has('foo', 'qwerty')).toEqual(false);
  expect(hashArgs.has('id', '1')).toEqual(true);
  expect(hashArgs.has('id', '2')).toEqual(true);
  expect(hashArgs.has('id', '3')).toEqual(false);
  expect(hashArgs.has('abc', '')).toEqual(false);
  expect(hashArgs.addToUrl('abc', '123', hashUrlPart)).toEqual(hashUrlPart + '&abc=123');
  expect(hashArgs.addToUrl('abc', '123', 'https://host.org/')).toEqual('https://host.org/#abc=123');
  expect(hashArgs.addToUrl('abc', '123', 'https://host.org/#a=1')).toEqual('https://host.org/#a=1&abc=123');
});
