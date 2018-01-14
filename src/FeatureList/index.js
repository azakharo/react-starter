import {remove, clone, findIndex} from "lodash";
import React from "react";
import {withRouter} from "react-router-dom";
import {Button, Panel, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import RestApi from "../rest"
import {subscribeFeatures, unsubscribeFeatures} from "../sockets";
import style from "./style.css";
import Auth from "../auth";


class FeatureList extends React.Component {

  state = {
    newFeature: "",
    features: null,
    loading: true,
    error: null
  };

  componentDidMount() {
    this.setState({loading: true, error: null});

    RestApi.getFeatures()
      .then(features => {
        this.setState({
          features,
          loading: false,
          error: null
        });
        subscribeFeatures(this.onFeatureSave.bind(this), this.onFeatureRemove.bind(this));
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.toString()
        });
        console.log(err);
      });
  }

  componentWillUnmount() {
    unsubscribeFeatures();
  }

  render() {
    const {newFeature, features, loading, error} = this.state;
    const isAuthed = Auth.isAuthenticated();

    return (
      <div className={style.pageWrapper}>

        {/*Loading indicator*/}
        {loading ? <div className={style.loadingIndicator}>Loading...</div> : null}

        {/*Feature list*/}
        {features && features.length > 0 ?
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
          : null
        }

        {/*Error indicator*/}
        {error ? <div className={style.errorIndicator}>Error: {error}</div> : null}

        {/*Add a new feature*/}
        <div className={style.addNewFeatureSection}>

          {/*Add form*/}
          <form onSubmit={this.addFeature.bind(this)}>
            <FormGroup controlId="feature" className={style.inlineBlock}>
              <ControlLabel>New feature:&nbsp;</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={newFeature}
                onChange={this.onNewFeatureInputChanged.bind(this)}
                className={style.addFeatureInput}
              />
            </FormGroup>
            <Button
              bsStyle="primary"
              className={style.inlineBlock}
              disabled={!newFeature}
              type="submit">
              Add
            </Button>
          </form>

          {/*Log out button*/}
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

  addFeature(e) {
    e.preventDefault();

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
    const features = clone(this.state.features);
    const ind = findIndex(features, ['_id', feature._id]);
    if (ind === -1) {
      features.push(feature);
    }
    else {
      features.splice(ind, 1, feature);
    }
    this.setState({features});
  }

  onFeatureRemove(feature) {
    const features = clone(this.state.features);
    remove(features, f => f._id === feature._id);
    this.setState({features});
  }

  logout() {
    Auth.logout();
    this.props.history.push("/login");
  }

} // comp

export default withRouter(FeatureList);
