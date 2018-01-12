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
      error: null
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

    Auth.login(email, password)
      .then(() => this.props.history.push("/main"))
      .catch((err) => {
        // wrong email and/or password?
        // disp err msg
        this.setState({error: 'Неверный адрес почты или пароль'});
      });
  };

  render() {
    const {error} = this.state;

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
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          {error ? <div className={style.errorMsg}>{error}</div> : null}
        </form>
      </div>
    );
  }
}
