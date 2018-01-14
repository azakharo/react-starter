import React from 'react';
import {HashRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "font-awesome/css/font-awesome.min.css";
import registerServiceWorker from './registerServiceWorker';
import Routes from "./routes"

ReactDOM.render(
  <Router>
    <Routes/>
  </Router>,
  document.getElementById('root'));

registerServiceWorker();
