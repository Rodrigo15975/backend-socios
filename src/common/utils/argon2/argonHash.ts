import * as argon from 'argon2';

// Encript password
export const hashPassword = (password: string) => argon.hash(password);

// Verify password encript
export const verifyPassword = (hashPassword: string, password: string) =>
  argon.verify(hashPassword, password);
