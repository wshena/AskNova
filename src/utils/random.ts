import { randomBytes } from 'crypto';

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + // A–Z
  'abcdefghijklmnopqrstuvwxyz' + // a–z
  '0123456789' +                 // 0–9
  '!@#$%^&*()_+-=[]{}|;:,.<>?';   // tanda baca

export function generateRandomString(length = 16): string {
  const bytes = randomBytes(length);
  const charsLength = CHARSET.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    const idx = bytes[i] % charsLength;
    result += CHARSET[idx];
  }

  return result;
}
