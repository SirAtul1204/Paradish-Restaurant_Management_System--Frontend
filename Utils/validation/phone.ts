export const validatePhone = (phone: number) => {
  return String(phone).length === 10 && phone > 0;
};
