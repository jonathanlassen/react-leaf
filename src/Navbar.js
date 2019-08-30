import React, { Component } from "react";
import LeafContext from './contexts/LeafContext';
import { userService } from "./auth/UserService";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Navbar extends Component {
    static contextType = LeafContext;

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
      };
     
      state = { error: null };

      componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user)
        {  
            this.context.setUser(user); 
        }
      }

      handleLogout(e) {
        userService.logout()
        this.context.logoutUser();
      }

    render() {   
      return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-300 p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <Link className="font-semibold text-xl tracking-tight" to='/'>Find A Frameshop</Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm flex-grow">
          
          </div>
         
              {(!this.context.user.username) && ( 
                <div>
                    <Link className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-100 bg-blue-200 hover:border-transparent hover:text-white hover:bg-blue-700 mt-4 lg:mt-0 mr-2" to='/login'>Login</Link>
                    <Link className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-100 bg-blue-200 hover:border-transparent hover:text-white hover:bg-blue-700 mt-4 lg:mt-0" to='/register'>Register</Link>
                </div>
                )}

            {this.context.user.username && ( 
                <div>
                    <span className="pr-3">Welcome back{this.context.user.username}!</span>
                    <div onClick={this.handleLogout}  className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-100 bg-blue-200 hover:border-transparent hover:text-white hover:bg-blue-700 mt-4 lg:mt-0 cursor-pointer">Logout</div>
                </div>
                )}

         
        </div> 
      </nav>  
      );
    }
  }