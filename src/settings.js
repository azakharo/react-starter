const {
  REACT_APP_BACKEND_URL
} = process.env;

export const BACKEND_URL = REACT_APP_BACKEND_URL || 'http://localhost:9000';
