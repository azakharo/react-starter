const {
  STARTER_BACKEND_URL,
  STARTER_SOCKET_SERVER_URL,
} = process.env;

export const BACKEND_URL = STARTER_BACKEND_URL || 'http://localhost:9000';
export const SOCKET_SERVER_URL = STARTER_SOCKET_SERVER_URL;