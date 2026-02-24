import type { TEnv } from "@/config/env";

declare global {
  namespace NodeJS {
    type ProcessEnv = {
      [K in keyof TEnv]: string;
    } & {
      PATH?: string;
      HOME?: string;
    };
  }
}

export {};
