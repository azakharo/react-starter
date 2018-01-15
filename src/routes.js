import React from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import FeatureList from "./FeatureList"
import LoginPage from "./LoginPage"
import Auth from "./auth"
import RestApi from "./rest";


class Routes extends React.PureComponent {

  componentWillMount() {
    RestApi.setUnauthInterceptor(this.onHttpStatus401.bind(this));
  }

  onHttpStatus401() {
    Auth.logout();
    this.props.history.push("/login");
  }

  componentWillUnmount() {
    RestApi.unsetUnauthInterceptor();
  }

  render() {
    return (
      <div>
        {Auth.isAuthenticated() ? (
          <Switch>
            <Route path="/main" component={FeatureList}/>

            <Route>
              <Redirect to="/main"/>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={LoginPage}/>

            <Route>
              <Redirect to="/login"/>
            </Route>
          </Switch>
        )}
      </div>
    );
  }
}

export default withRouter(Routes);
