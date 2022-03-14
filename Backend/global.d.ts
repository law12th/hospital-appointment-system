namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    NODE_ENV: "development" | "production";
    POSTGRES_USER: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    POSTGRES_DATABASE: string;
    POSTGRES_PASSWORD: string;
    JWT_SECRET: string;
    SENDGRID_API_KEY: string;
    SENDGRID_USER_DETAILS_TEMPLATE_ID: string;
    EMAIL: string;
  }
}
