import { encrypt, decrypt } from './crypto.js';

describe('Module tests...', () => {
  test('test framework works', () => {
    var actual = 'hello world';
    expect(actual).toBe('hello world');
  });

  test('valid crypto functions', async () => {
    const salt = 'xcvxcvcxxcb234sdvds';
    const text = 'vdfvjnfdsvnsfdvnfln';
    const decrypted = decrypt(encrypt(text, salt), salt);
    expect(decrypted).toBe(text);
  });
});
