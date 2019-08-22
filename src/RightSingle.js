import React, { Component } from "react";
export default class RightSingle extends Component {

    constructor(props) {
        super(props);
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
          <img className="w-full overflow-hidden object-cover object-top h-48 w-full overflow-hidden"  alt="" src={returnRandomImage(this.props.shop.id)}  />
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

            <div onClick={this.props.closeRightSingle}>close</div>
      </div> 
      </div> 
      </div> 
      );
    }
  }