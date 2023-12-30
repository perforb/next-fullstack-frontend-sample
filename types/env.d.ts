/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_USER: string,
      MONGO_DB_PASSWORD: string,
      MONGO_DB_ATLAS_HOST: string,
    }
  }
}

export {}