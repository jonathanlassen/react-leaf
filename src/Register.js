import React, { Component } from "react";
export default class Register extends Component {
    render() {    
      return (
        <div  >
        <h1>Register</h1>
          <div>
              <input type="text" name="username"  placeholder="Username" />
              <input type="password" name="password"  placeholder="Password"/>
              <input type="text" name="email"  placeholder="email" />
              <button type="button">Register</button>
          </div>
  
  
      </div>
      );
    }
  }