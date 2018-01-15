import {remove, clone, findIndex} from "lodash";
import React from "react";
import {Button, Panel, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
import RestApi from "../rest"
import {subscribeFeatures, unsubscribeFeatures} from "../sockets";
import style from "./style.css";
import Auth from "../auth";
import {BACKEND_URL} from "../settings"


class FeatureList extends React.Component {

  state = {
    newFeature: "",
    features: null,
    loading: true,
    error: null,
    operIsInProgress: false
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
    const {newFeature, features, loading, error, operIsInProgress} = this.state;
    const isAuthed = Auth.isAuthenticated();

    return (
      <div className={style.pageWrapper}>

        {/*Feature list*/}
        {/*Caption*/}
        <div className={style.featureListCaption}>node-starter feature list</div>
        {/*Loading indicator*/}
        {loading ? <div className={style.loadingIndicator}>Loading...</div> : null}
        {/*Feature list content*/}
        {features && features.length > 0 ?
          <div className={style.featureList}>
            {features.map((feature, featureInd) => {
              return (
                <div className={style.panelWrapper} key={`feature_${featureInd}`}>
                  <Panel>
                    <Panel.Body>
                      <span>{feature.name}</span>
                      <button className={`btn btn-danger btn-xs ${style.remFeatureBtn}`}
                              onClick={this.remFeature.bind(this, feature)}
                              disabled={operIsInProgress}>
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
              disabled={!newFeature || operIsInProgress}
              type="submit">
              Add
            </Button>
          </form>

          {/*Log out button*/}
          {isAuthed ?
            <Button bsStyle="default" className={style.logoutBtn} onClick={this.logout.bind(this)}>Logout</Button>
            : null}

        </div>

        {/*socket upd hint*/}
        <div className={style.testSocketHint}>To test data update via sockets open several tabs in the browser or open a different browser and try to change the data.</div>

        <div className={style.linksSection}>
          <div className={style.linksCaption}>Links:</div>
          <ul>
            <li>
              {/*API documentation link*/}
              <a href={`${BACKEND_URL}/docs`} target="_blank" rel="noopener noreferrer">Swagger interactive API documentation</a>
            </li>
            <li>
              {/*node-starter github repo link*/}
              <a href="https://github.com/azakharo/node-starter" target="_blank" rel="noopener noreferrer">node-starter GitHub repo</a>
            </li>
            <li>
              {/*react-starter github repo link*/}
              <a href="https://github.com/azakharo/react-starter" target="_blank" rel="noopener noreferrer">react-starter - this demo frontend's GitHub repo</a>
            </li>
          </ul>
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

    this.setState({error: null, operIsInProgress: true});

    RestApi.postFeature(newFeature)
      .then(() => {
        this.setState({
          newFeature: "",
          error: null,
          operIsInProgress: false
        });
      })
      .catch(err => {
        this.setState({
          error: err.toString(),
          operIsInProgress: false
        });
        console.log(err);
      });
  }

  remFeature(feature) {
    this.setState({error: null, operIsInProgress: true});

    RestApi.remFeature(feature)
      .then(() => {
        this.setState({
          error: null,
          operIsInProgress: false
        });
      })
      .catch(err => {
        this.setState({
          error: err.toString(),
          operIsInProgress: false
        });
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

export default FeatureList;
