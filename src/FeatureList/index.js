import React from "react";
import {BACKEND_URL} from "../settings"

class FeatureList extends React.Component {

  state = {
    features: null
  };

  componentDidMount() {
    fetch(`${BACKEND_URL}/api/things`)
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>ha-ha-ha</div>
    );
  }

} // comp

export default FeatureList;
