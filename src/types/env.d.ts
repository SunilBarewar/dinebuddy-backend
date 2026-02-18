declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      SERVER_ENV: "development" | "production" | "test";
      DATABASE_URL: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_EXPIRATION: string;
      JWT_REFRESH_EXPIRATION: string;
    }
  }
}

export {};
