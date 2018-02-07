import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "font-awesome/css/font-awesome.min.css";
import {unregister} from './registerServiceWorker';
import Routes from "./routes"
// Antd CSS imports
import 'antd/lib/button/style/index.css';


ReactDOM.render(
  <Router>
    <Routes/>
  </Router>,
  document.getElementById('root'));

unregister();
