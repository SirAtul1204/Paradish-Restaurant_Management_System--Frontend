const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export const validateEmail = (email: string): boolean => {
  email = email.trim();
  if (!email) return false;

  return email.match(emailRegex) ? true : false;
};
