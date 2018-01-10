import React from "react";
import {Button, Panel} from "react-bootstrap"
import {BACKEND_URL} from "../settings"
import style from "./style.css";

class FeatureList extends React.Component {

  state = {
    newFeature: "",
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
    fetch(`${BACKEND_URL}/api/things/${feature._id}`, {
      method: "DELETE"
    })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {newFeature, features} = this.state;
    if (!features) {
      return null;
    }

    return (
      <div className={style.pageWrapper}>
        {/*Feature list*/}
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

        {/*Add a new feature*/}
        <div className={style.addNewFeatureSection}>
          <input type="text" className={`form-control ${style.addFeatureInput}`}
                 onChange={this.onNewFeatureInputChanged.bind(this)} value={newFeature}/>
          <Button bsStyle="primary" onClick={this.addFeature.bind(this)}>Add</Button>
        </div>

      </div>
    );
  }

  onNewFeatureInputChanged(e) {
    this.setState({newFeature: e.target.value});
  }

  addFeature() {
    const {newFeature} = this.state;

    fetch(`${BACKEND_URL}/api/things`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newFeature
      })
    })
      .then(() => {
        this.setState({newFeature: ""});
      })
      .catch(err => {
        console.log(err);
      });
  }

} // comp

export default FeatureList;
