import RestApi from "./rest"


class Auth {

  static isAuthenticated() {
    const token = localStorage.getItem('token');

    if (token) {
      RestApi.setAuthHeader(this.createAuthHeaderVal(token));
    }

    return token !== null;
  }

  static login(username, password) {
    return new Promise((resolve, reject) => {
      RestApi.login(username, password)
        .then((token) => {
          this.saveToken(token);
          RestApi.setAuthHeader(this.createAuthHeaderVal(token));
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  static logout() {
    RestApi.unsetAuthHeader();
    this.remToken();
  }

  static getToken() {
    return localStorage.getItem('token');
  }


  ///////////////////////////////////////////////////////////////////
  // Private

  static saveToken(token) {
    localStorage.setItem('token', token);
  }

  static remToken() {
    localStorage.removeItem('token');
  }

  static createAuthHeaderVal(token) {
    return `Bearer ${token}`;
  }

}

export default Auth;
