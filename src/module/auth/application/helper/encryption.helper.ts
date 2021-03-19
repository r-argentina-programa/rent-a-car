import * as bcrypt from 'bcrypt';

export function encryptPassword(value: string): string {
  return bcrypt.hashSync(value, 10);
}

export function comparePasswords(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
