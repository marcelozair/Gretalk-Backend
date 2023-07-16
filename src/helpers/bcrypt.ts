import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encrypt = async (value: string) : Promise<string> => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const result = await bcrypt.hash(value, salt);
  return result;
}

export const validate = async (password: string, hash: string) : Promise<boolean> => {
  return bcrypt.compareSync(password, hash);
}