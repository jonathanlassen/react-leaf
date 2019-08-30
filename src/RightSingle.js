import React, { Component } from "react";
import { authHeader } from './auth/AuthHeader';
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
              console.log(this.state.user);
            }); 
            console.log(this.props)
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
            <div className="font-bold text-l mb-2">{this.props.shop.name}</div>
            <p className="text-grey-darker text-sm">
            </p>
            <p  className="text-grey-darker text-sm">
              {faker.lorem.paragraphs()}
            </p>
            <div>
              {!this.props.shop.telephone ? faker.phone.phoneNumberFormat() : this.props.shop.telephone }
            </div>
            <div>
              {!this.props.shop.telephone ? faker.address.streetAddress("###") : this.props.shop.address }
              <br />
              {faker.address.city()}, {faker.address.stateAbbr()} {faker.address.zipCode()}
            </div>
            <div>
            </div>

            <div onClick={this.props.closeRightSingle}>close</div>
            { !this.props.shop.owned && this.state.user.id && !this.state.user.shop_id && this.state.user.shop_id !== this.props.shop.id ? <div className="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent hover:text-blue hover:bg-white mt-4 mr-2 lg:mt-0">
            <Link to={'claim/'+this.props.shop.id} >CLAIM THIS SHOP</Link>
              </div> : <div></div>}

            { this.props.shop.owned && this.state.user.id  && this.state.user.shop_id === this.props.shop.id ? <div className="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent hover:text-blue hover:bg-white mt-4 mr-2 lg:mt-0">
            <Link to={'edit/'+this.props.shop.id} >EDIT THIS SHOP</Link>
              </div> : <div></div>}
         
            </div>
      </div> 
      </div> 
      );
    }
  }