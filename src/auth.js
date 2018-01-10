class Auth {

  static saveToken(token) {
    localStorage.setItem('token', token);
  }

  static isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static remToken() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;
