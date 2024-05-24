// global environment variables

import { IUser } from '@/types';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: number;
    DATABASE_URL: string;
    CORS_ORIGIN: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    COOKIE_SECRET: string;
    COOKIE_NAME: string;
    BCRYPT_SALT: string;
    MAILGUN_API_KEY: string;
    OLX_EMAIL: string;
    // cloudinary
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_URL: string;
  }
}

// express
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
