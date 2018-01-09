import React from "react";
import {Panel} from "react-bootstrap"
import {BACKEND_URL} from "../settings"
import style from "./style.css";

class FeatureList extends React.Component {

  state = {
    features: null
  };

  componentDidMount() {
    fetch(`${BACKEND_URL}/api/things`)
      .then(resp => resp.json())
      .then(features => {
        this.setState({features});
      })
      .catch(err => {
        console.log(err);
      });
  }

  remFeature(feature) {
    console.log(`rem feature '${feature.name}'`);

    fetch(`${BACKEND_URL}/api/things/${feature._id}`, {
      method: "DELETE"
    })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {features} = this.state;
    if (!features) {
      return null;
    }

    return (
      <div className={style.featureList}>
        {features.map((feature, featureInd) => {
          return (
            <div className={style.panelWrapper} key={`feature_${featureInd}`}>
              <Panel>
                <Panel.Body>
                  <span>{feature.name}</span>
                  <button className={`btn btn-danger btn-xs ${style.remFeatureBtn}`}
                          onClick={this.remFeature.bind(this, feature)}>
                    <span className={`fa fa-times`}></span>
                  </button>
                </Panel.Body>
              </Panel>
            </div>
          );
        })}
      </div>
    );
  }

} // comp

export default FeatureList;
