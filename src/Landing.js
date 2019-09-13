import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container mx-auto mt-24 h-48 sm:w-auto px-4 md:max-w-lg lg:max-w-xl xl:max-w-2xl ">
        <div className="text-center text-2xl font-black">Find A Frameshop</div>

        <div className="mt-4 ">
          This innovative application allows potential custom framing customers
          to find a nearby shop, and provides a marketing platform to custom
          framers.
        </div>

        <div className="mt-2">
          Non-logged in users have access to the main map, and can see
          information posted regarding each shop.
        </div>

        <div className="mt-2">
          Logged-in users can 'claim' unclaimed shops, and start add/edit/update
          information about each shop.
        </div>

        <div className="mt-4 text-center">
          <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-blue-700 border-blue-100 bg-blue-200 hover:border-transparent hover:text-white hover:bg-blue-700 mt-4 lg:mt-0 cursor-pointer">
            <a href="/map">Start</a>
          </div>
        </div>
      </div>
    );
  }
}
