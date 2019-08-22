import React, { Component } from "react";
export default class RightSingle extends Component {

    constructor(props) {
        super(props);
      }
    
    render() {    
      return (
        <div className="w-2/5 flex flex-row flex-wrap overflow-auto p-8 items-stretch h-screen justify-around">  
        <div className="rounded overflow-hidden shadow-lg">
          <div className="px-3 py-3">
          <img className="w-full overflow-hidden object-cover object-top h-48 w-full overflow-hidden"  alt="" />
            <div className="font-bold text-l mb-2">{this.props.shop.name}</div>
            <p className="text-grey-darker text-sm">
            </p>
            <p  className="text-grey-darker text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
            <div>
              (978) 213-8369
            </div>
            <div>
              1258 Gorham St.
              Lowell, MA 01852
            </div>
            <div>
            </div>
      </div> 
      </div> 
      </div> 
      );
    }
  }