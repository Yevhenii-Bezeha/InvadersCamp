import * as bcrypt from 'bcrypt';

export const toHashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
};

export const comparePassword = async (
  password: string,
  userPassword: string
) => {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (error) {
    throw error;
  }
};
