export interface ConfigKeys {
    NODE_ENV: 'production' | 'development';
    APP_PORT: number;
    MONGO_URI: string;
    PASSWORD_HASH_SALT: number;
    TOKEN_ENCRYPT_SECRET: string;
    GRAPHQL_ENDPOINT_PATH: string;
    PDF_FOLDER_NAME: string;
  }
  