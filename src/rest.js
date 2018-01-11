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

  static postFeature(feature) {
    return new Promise((resolve, reject) => {
      fetch(`${BACKEND_URL}/api/things`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: feature
        })
      })
        .then(() => resolve())
        .catch(err => reject(err));
    });
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

}

export default RestApi;
