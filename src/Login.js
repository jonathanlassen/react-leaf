import React, { Component } from "react";
export default class Login extends Component {
    render() {    
      return (
        <div>
            <h1>Login</h1>
            <input type="text" name="username"  placeholder="Username" />
            <input type="password" name="password"  placeholder="Password" />
            <button type="button">Login</button>
        
        </div>
      );
    }
  }