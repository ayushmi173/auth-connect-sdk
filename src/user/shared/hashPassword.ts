import * as bcrypt from "bcrypt";

export async function buildHashPassword(
  password: string,
  salt: string
): Promise<string> {
  return bcrypt.hash(password, salt);
}
