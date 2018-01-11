import {BACKEND_URL} from "./settings";

class RestApi {

  static getFeatures() {
    return new Promise((resolve, reject) => {
      fetch(`${BACKEND_URL}/api/things`)
        .then(resp => resp.json())
        .then(features => resolve(features))
        .catch(err => reject(err));
    });
  }

  // Returns auth token on success
  static login(username, password) {
    return new Promise((resolve, reject) => {
      this.post(`${BACKEND_URL}/auth/local`, {
        email: username,
        password: password
      })
        .then(resp => resp.json())
        .then(data => resolve(data.token))
        .catch(err => reject(err));
    });
  }

  static postFeature(feature) {
    return this.post(`${BACKEND_URL}/api/things`, {name: feature});
  }

  static remFeature(feature) {
    return new Promise((resolve, reject) => {
      fetch(`${BACKEND_URL}/api/things/${feature._id}`, {
        method: "DELETE"
      })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((resp) => resolve(resp))
        .catch(err => reject(err));
    });
  }

}

export default RestApi;
