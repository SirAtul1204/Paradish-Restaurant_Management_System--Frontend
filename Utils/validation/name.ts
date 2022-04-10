export const validateName = (name: string) => {
  name = name.trim();
  if (name) return true;
  return false;
};
