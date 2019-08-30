import React, { Component } from "react";
import { userService } from "./auth/UserService";
import LeafContext from './contexts/LeafContext';

export default class Login extends Component {
    static contextType = LeafContext;

      state = { error: null };
      handleSubmit = ev => {
        ev.preventDefault();
        const { username, password } = ev.target;
        this.setState({ error: null });
        userService.login(username.value, password.value)
          .then(res => {
            username.value = '';
            password.value = '';
            this.context.setUser(res);
            //this.props.history.push('/')
          })
          .catch(res => {
            this.setState({ error: res.error });
          });
      };

    render() {   
      const { error } = this.state; 

      return (
        <fieldset>
        <form className='LoginForm' onSubmit={this.handleSubmit}>
          <div role='alert'>
            {error && <p className='form-error'>{error}</p>}
          </div>
          <div>
            <label htmlFor='login-username-input' className='form-label'>
              Username
            </label>
            <input
              className='form-input'
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              required
            />
          </div>
          <div>
            <label htmlFor='login-password-input' className='form-label'>
              Password
            </label>
            <input
              className='form-input'
              id='login-password-input'
              name='password'
              type='password'
              required
            />
          </div>
          <button type='submit' className='button'>
            Login
          </button>
        </form>
      </fieldset>
      );
    }
  }