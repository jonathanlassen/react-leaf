/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Component } from 'react';
import { userService } from './auth/UserService';

export default class Login extends Component {
  state = { error: null };

  handleSubmit = ev => {
    ev.preventDefault();
    const { username, password, email } = ev.target;
    this.setState({ error: null });
    userService
      .register(username.value, password.value, email.value)
      .then(res => {
        username.value = '';
        password.value = '';
        this.props.history.push('/login');
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="md:flex justify-center">
        <form className="RegesterForm" onSubmit={this.handleSubmit}>
          <fieldset className="bg-indigo-100 p-8 mt-8">
            <div role="alert">
              {error && <p className="text-red-700">{error}</p>}
            </div>
            <div>
              <label htmlFor="register-username-input" className="form-label">
                Username
              </label>
              <input
                className="form-input"
                ref={this.firstInput}
                id="register-username-input"
                name="username"
                required
              />
            </div>
            <div>
              <label htmlFor="register-password-input" className="form-label">
                Password
              </label>
              <input
                className="form-input"
                id="register-password-input"
                name="password"
                type="password"
                required
              />
            </div>
            <div>
              <label htmlFor="register-email-input" className="form-label">
                Email
              </label>
              <input
                className="form-input"
                id="register-email-input"
                name="email"
                required
              />
            </div>

            <button type="submit" className="submitButton">
              Register
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
