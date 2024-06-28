export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY || 'secretKey',
};

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}