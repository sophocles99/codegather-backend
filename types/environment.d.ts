declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    MONGO_URI: string;
  }
}