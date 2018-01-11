import RestApi from "./rest"


class Auth {

  static isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static login(username, password) {
    return new Promise((resolve, reject) => {
      RestApi.login(username, password)
        .then((token) => {
          this.saveToken(token);
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  static logout() {
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
}

export default Auth;
