import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Auth from "../auth"
import style from "./style.css";


export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null,
      loading: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      error: null
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const {email, password} = this.state;

    this.setState({loading: true, error: null});

    Auth.login(email, password)
      .then(() => this.props.history.push("/main"))
      .catch((err) => {
        // wrong email and/or password?
        // disp err msg
        this.setState({
          error: 'Неверный адрес почты или пароль',
          loading: false});
      });
  };

  render() {
    const {error, loading} = this.state;

    return (
      <div className={style.loginSection}>
        <form onSubmit={this.handleSubmit} className={style.loginForm}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              disabled={loading}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              disabled={loading}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm() || loading}
            type="submit">
            {loading ?
              [
                <span key="loading-text">Logging in... </span>,
                <i className="fa fa-spinner fa-pulse fa-fw" key="loading-spinner"></i>
              ]
              : <span>Login</span>}
          </Button>
          {error ? <div className={style.errorMsg}>{error}</div> : null}
        </form>
      </div>
    );
  }

}
