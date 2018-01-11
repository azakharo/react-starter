import React from "react";
import {withRouter} from "react-router-dom";
import {Button, Panel} from "react-bootstrap"
import RestApi from "../rest"
import {subscribeFeatures, unsubscribeFeatures} from "../sockets";
import style from "./style.css";
import Auth from "../auth";


class FeatureList extends React.Component {

  state = {
    newFeature: "",
    features: null
  };

  componentDidMount() {
    RestApi.getFeatures()
      .then(features => {
        this.setState({features});
        subscribeFeatures(this.onFeatureSave.bind(this), this.onFeatureRemove.bind(this));
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    unsubscribeFeatures();
  }

  render() {
    const {newFeature, features} = this.state;
    const isAuthed = Auth.isAuthenticated();

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

          {isAuthed ?
            <Button bsStyle="default" className={style.logoutBtn} onClick={this.logout.bind(this)}>Logout</Button>
            : null}

        </div>

      </div>
    );
  }

  onNewFeatureInputChanged(e) {
    this.setState({newFeature: e.target.value});
  }

  addFeature() {
    const {newFeature} = this.state;

    RestApi.postFeature(newFeature)
      .then(() => {
        this.setState({newFeature: ""});
      })
      .catch(err => {
        console.log(err);
      });
  }

  remFeature(feature) {
    RestApi.remFeature(feature)
      .catch(err => {
        console.log(err);
      });
  }

  onFeatureSave(feature) {
    console.log(`onFeatureSave: ${feature.name}`);
    console.log(feature);
  }

  onFeatureRemove(feature) {
    console.log(`onFeatureRemove: ${feature.name}`);
    console.log(feature);
  }

  logout() {
    Auth.logout();
    this.props.history.push("/login");
  }

} // comp

export default withRouter(FeatureList);
