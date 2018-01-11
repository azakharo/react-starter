import axios from "axios"
import {BACKEND_URL} from "./settings";

class RestApi {

  static getFeatures() {
    return new Promise((resolve, reject) => {
      axios(`${BACKEND_URL}/api/things`)
        .then(resp => resolve(resp.data))
        .catch(err => reject(err));
    });
  }

  // Returns auth token on success
  static login(username, password) {
    return new Promise((resolve, reject) => {
      axios.post(`${BACKEND_URL}/auth/local`, {
        email: username,
        password: password
      })
        .then(resp => resolve(resp.data.token))
        .catch(err => reject(err));
    });
  }

  static postFeature(feature) {
    return axios.post(`${BACKEND_URL}/api/things`, {name: feature});
  }

  static remFeature(feature) {
    return axios.delete(`${BACKEND_URL}/api/things/${feature._id}`);
  }

  static setAuthHeader(val) {
    axios.defaults.headers.common['Authorization'] = val;
  }

  static unsetAuthHeader(val) {
    delete axios.defaults.headers.common['Authorization'];
  }

  static unauthInterceptor = null;

  static setUnauthInterceptor(callback) {
    // Add a response interceptor
    this.unauthInterceptor = axios.interceptors.response.use(
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
      axios.interceptors.response.eject(this.unauthInterceptor);
      this.unauthInterceptor = null;
    }
  }

}

export default RestApi;
