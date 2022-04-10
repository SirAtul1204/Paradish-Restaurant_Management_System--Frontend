const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const validatePassword = (password: string) => {
  return password.match(passwordRegex) ? true : false;
};
