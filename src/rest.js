import axios from "axios"
import {BACKEND_URL} from "./settings";

class RestApi {

  static axi = axios.create({
    baseURL: BACKEND_URL
  });

  static getFeatures() {
    return new Promise((resolve, reject) => {
      this.axi('/api/things')
        .then(resp => resolve(resp.data))
        .catch(err => reject(err));
    });
  }

  // Returns auth token on success
  static login(username, password) {
    return new Promise((resolve, reject) => {
      this.axi.post('/auth/local', {
        email: username,
        password: password
      })
        .then(resp => resolve(resp.data.token))
        .catch(err => reject(err));
    });
  }

  static postFeature(feature) {
    return this.axi.post('/api/things', {name: feature});
  }

  static remFeature(feature) {
    return this.axi.delete(`/api/things/${feature._id}`);
  }

  static setAuthHeader(val) {
    this.axi.defaults.headers.common['Authorization'] = val;
  }

  static unsetAuthHeader(val) {
    delete this.axi.defaults.headers.common['Authorization'];
  }

  static unauthInterceptor = null;

  static setUnauthInterceptor(callback) {
    // Add a response interceptor
    this.unauthInterceptor = this.axi.interceptors.response.use(
      response => {
        // Do something with response data
        return response;
      },
      error => {
        // Do something with response error
        if (error.response && error.response.status === 401) {
          callback();
        }
        return Promise.reject(error);
      });
  }

  static unsetUnauthInterceptor() {
    if (this.unauthInterceptor) {
      this.axi.interceptors.response.eject(this.unauthInterceptor);
      this.unauthInterceptor = null;
    }
  }

}

export default RestApi;
