const {
  STARTER_BACKEND_URL
} = process.env;

export const BACKEND_URL = STARTER_BACKEND_URL || 'http://localhost:9000';
