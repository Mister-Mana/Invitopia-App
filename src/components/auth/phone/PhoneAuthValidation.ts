
export const validatePhone = (phone: string): boolean => {
  return Boolean(phone.trim() && /^\+?[0-9\s-]{8,15}$/.test(phone.replace(/\s+/g, '')));
};

export const validateName = (name: string | undefined, isSignup: boolean): boolean => {
  if (isSignup && (!name || !name.trim())) {
    return false;
  }
  return true;
};

export const validateVerificationCode = (code: string): boolean => {
  return code.length === 6;
};
