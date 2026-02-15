export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const redactPhone = (phone?: string): string | undefined =>
  phone ? `${phone.slice(0, 3)}****${phone.slice(-2)}` : undefined;
