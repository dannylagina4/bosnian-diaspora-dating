export type AuthProvider = 'email' | 'phone' | 'google';

export interface JwtPayload {
  sub: string;
  email?: string;
  phone?: string;
}

export interface UserProfileDTO {
  userId: string;
  firstName: string;
  lastName: string;
  bio?: string;
  city?: string;
  country?: string;
}
