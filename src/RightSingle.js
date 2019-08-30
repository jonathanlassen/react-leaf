import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const faker = require('faker');
faker.locale = "en_US";
export default class RightSingle 
extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: {}
        };
      }
     // authHeader()
     componentDidMount() {
          let user = JSON.parse(localStorage.getItem('user'));
          if (user)
          {  
            this.setState({user:user},  () => {
       
            }); 
          }
     }
    
    render() {    
      const images =['https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_20-55-53_hdt5kw.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_22-15-03_x1ckgx.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_09-04-29_zqqkka.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-07-04_10-18-31_maxm35.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/Screenshot_from_2019-02-21_20-58-54_aqak0f.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/Screenshot_from_2019-07-04_10-47-10_tbbi9q.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051278/Screenshot_from_2019-07-04_18-34-55_edsg5l.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051278/Screenshot_from_2019-07-04_14-41-35_ua0yxi.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/bella2_g8y0iq.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/bella2_g8y0iq.png'];

      function returnRandomImage(id){
        const random = id.toString().split('').pop();
        return images[random];
      }

      return (
        <div className="w-2/5 flex flex-row flex-wrap overflow-auto p-8 items-stretch h-screen justify-around">  
        <div className="rounded overflow-hidden shadow-lg">
          <div className="px-3 py-3">
          <img className="w-full overflow-hidden object-cover object-top h-64 w-full overflow-hidden"  alt="" src={returnRandomImage(this.props.shop.id)}  />
            <div className="font-bold text-2xl mb-2 mt-2">{this.props.shop.name}</div>
            <p className="text-grey-darker text-sm">
            </p>
            <p  className="text-grey-darker text-sm">
            {!this.props.shop.description ? faker.lorem.paragraphs() : this.props.shop.description }
            </p>
            <div className="mt-1">
              {!this.props.shop.telephone ? faker.phone.phoneNumberFormat() : this.props.shop.telephone }
            </div>
            <div className="mt-1 text-sm">
              {!this.props.shop.address ? faker.address.streetAddress("###") : this.props.shop.address }
              <br />
              {!this.props.shop.city ? faker.address.city() : this.props.shop.city }, {!this.props.shop.statecode ? faker.address.stateAbbr() : this.props.shop.statecode } {!this.props.shop.zip ? faker.address.zipCode() : this.props.shop.zip }
            </div>
            <div>
            </div>

            <div className="inline-block text-sm px-4 py-2 leading-none border rounded hover:text-blue-700 border-blue-100 hover:bg-blue-200 hover:border-transparent text-white bg-blue-700 mt-4 lg:mt-2 mr-2" onClick={this.props.closeRightSingle}>CLOSE</div>
            { !this.props.shop.owned && this.state.user.id && !this.state.user.shop_id && this.state.user.shop_id !== this.props.shop.id ? <div className="inline-block text-sm px-4 py-2 leading-none border rounded hover:text-blue-700 border-blue-100 hover:bg-blue-200 hover:border-transparent text-white bg-blue-700 mt-4 lg:mt-2 mr-2">
            <Link to={'claim/'+this.props.shop.id} >CLAIM THIS SHOP</Link>
              </div> : <div></div>}

            { this.props.shop.owned && this.state.user.id  && this.state.user.shop_id === this.props.shop.id ? <div className="inline-block text-sm px-4 py-2 leading-none border rounded hover:text-blue-700 border-blue-100 hover:bg-blue-200 hover:border-transparent text-white bg-blue-700 mt-4 lg:mt-2 mr-2">
            <Link to={'edit/'+this.props.shop.id} >EDIT THIS SHOP</Link>
              </div> : <div></div>}
         
            </div>
      </div> 
      </div> 
      );
    }
  }