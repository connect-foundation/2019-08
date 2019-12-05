import bcrypt from "bcryptjs";

export const generateHashedPassword = async (password: string) => {
  return await bcrypt.hash(password, process.env.PASSWORD_SALT);
};
