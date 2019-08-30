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


      handleLogout(e) {

        console.log('hi')
        userService.logout()
        this.context.logoutUser();


      }

    render() {   
      return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-300 p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Find a Frameshop</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm flex-grow">
          
          </div>
         
              {!this.context.user && ( 
                <div>
                    <Link className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 mr-2 lg:mt-0" to='/login'>Login</Link>
                    <Link className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 lg:mt-0" to='/register'>Register</Link>
                </div>
                )}

                {this.context.user && ( 
                <div>

                    <a onClick={this.handleLogout}  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 lg:mt-0">Logout</a>
                </div>
                )}
    
         
        </div> 
      </nav>  
      );
    }
  }