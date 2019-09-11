/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const LeafContext = React.createContext({
  setUser: () => {},
  logoutUser: () => {},
});

export default LeafContext;

export class LeafProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  setUser = obj => {
    this.setState({ user: obj });
  };

  logoutUser = obj => {
    const user = { username: null };

    this.setState({ user });
  };

  render() {
    const value = {
      user: this.state.user,
      setUser: this.setUser,
      logoutUser: this.logoutUser,
    };

    return (
      <LeafContext.Provider value={value}>
        {this.props.children}
      </LeafContext.Provider>
    );
  }
}
