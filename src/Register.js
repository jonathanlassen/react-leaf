import React, { Component } from "react";
import { userService } from "./auth/UserService";

export default class Login extends Component {

    constructor(props) {
        super(props);
      }

      state = { error: null };
      handleSubmit = ev => {
        ev.preventDefault();
        const { username, password, email} = ev.target;
        this.setState({ error: null });
        userService.register(username.value, password.value, email.value)
          .then(res => {
            username.value = '';
            password.value = '';
            
          })
          .catch(res => {
            this.setState({ error: res.error });
          });
      };

    render() {   
      const { error } = this.state; 
      return (
        <fieldset>
        <form className='RegesterForm' onSubmit={this.handleSubmit}>
          <div role='alert'>
            {error && <p className='form-error'>{error}</p>}
          </div>
          <div>
            <label htmlFor='register-username-input' className='form-label'>
              Username
            </label>
            <input
              className='form-input'
              ref={this.firstInput}
              id='register-username-input'
              name='username'
              required
            />
          </div>
          <div>
            <label htmlFor='register-password-input' className='form-label'>
              Password
            </label>
            <input
              className='form-input'
              id='register-password-input'
              name='password'
              type='password'
              required
            />
          </div>
          <div>
            <label htmlFor='register-email-input' className='form-label'>
              Email
            </label>
            <input
              className='form-input'
              id='register-email-input'
              name='email'
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