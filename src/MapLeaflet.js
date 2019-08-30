import "./Map.css";
import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import axios from 'axios';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import LocateControl from './LocateControl';
import RightSingle from "./RightSingle";
import LeafContext from './contexts/LeafContext';


const faker = require('faker');
faker.locale = "en_US";

require('react-leaflet-markercluster/dist/styles.min.css');

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [13, 0]
});

const images =['https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_20-55-53_hdt5kw.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_22-15-03_x1ckgx.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_09-04-29_zqqkka.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-07-04_10-18-31_maxm35.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/Screenshot_from_2019-02-21_20-58-54_aqak0f.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/Screenshot_from_2019-07-04_10-47-10_tbbi9q.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051278/Screenshot_from_2019-07-04_18-34-55_edsg5l.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051278/Screenshot_from_2019-07-04_14-41-35_ua0yxi.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/bella2_g8y0iq.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/bella2_g8y0iq.png'];

function returnRandomImage(id){
  const random = id.toString().split('').pop();
  return images[random];
}

function RightListShops(props) {
  let shops = props.shops;
  if (shops.length > 25)
    shops = shops.slice(0, 24);

    const show = shops.map((shop) => 
        <div key={shop.id} className="p-3 m-2 xl:w-5/12 lg:w-full rounded overflow-hidden shadow-lg">
          <img onClick={(e) => props.func(e,shop.id)} alt="" src={returnRandomImage(shop.id)}  className="object-cover object-top h-48 w-full overflow-hidden cursor-pointer" ></img>
            <div className="font-bold text-lg mt-1 mb-1" onClick={(e) => props.func(e,shop.id)} > {shop.properties.Name}</div>
            <p  className="text-grey-darker text-sm">
              {!shop.properties.description ? faker.lorem.paragraph() : shop.properties.description }
            </p>
            <div  className="mt-1">
              {!shop.properties.telephone ? faker.phone.phoneNumberFormat() : shop.properties.telephone }
              
            </div>
            <div  className="mt-1 text-sm">
            {!shop.properties.address ? faker.address.streetAddress("###") : shop.properties.address }
             <br />
            {!shop.properties.city ? faker.address.city() : shop.properties.city }
              ,&nbsp;{!shop.properties.statecode ? faker.address.stateAbbr() : shop.properties.statecode }
              ,&nbsp;{!shop.properties.zip ? faker.address.zipCode() : shop.properties.zip }
            </div>
        </div> 
    );

    return (  
      <div className="w-2/5 flex flex-row flex-wrap overflow-auto p-8 items-stretch h-screen justify-around">  
      {show}
      </div> 
  );

  }

  function ListShops(props) {
    const shops = props.shops;
    const show = shops.map((shop) =>
        <Marker key={shop.id} position={shop.geometry.coordinates} icon={customMarker} onClick={(e) => props.func(e,shop.id)} autoPan={'false'}>
            <Popup >
                {shop.properties.Name}
            </Popup>
        </Marker>
    );
    
    return (  
        <div >  
        {show}
        </div> 
    );
  }
export default class MapLeaflet extends Component {

  static contextType = LeafContext;

  constructor(props) {
    super(props);
    this.state = {
      lat: 42,
      lng: -71,
      zoom: 14,
      tempshops: [],
      shops: [],
      changedbounds:'',
      toshowshops: [],
      lastrun:'',
      single: false,
      singleinfo: {}
    };
    this.handleShopClick = this.handleShopClick.bind(this);
    this.closeRightSingle = this.closeRightSingle.bind(this);
    this.refMap = React.createRef();
  }

  handleShopClick(e, shopid) {
  //  const popup = e.target.getPopup();
   // const content = popup.setContent('yeah');
    axios.get(`https://powerful-wildwood-94772.herokuapp.com/shop/`+shopid)
    .then(res => {
      this.setState({singleinfo: res.data });
      this.setState({single:true})
    }) 
  }

  closeRightSingle () {
    this.setState({single:false});
  }


   onMoveEnd = (e) => {
    var d = new Date();
    var n = d.getTime();
    if (this.state.lastrun)
    {
      if ((n-this.state.lastrun) < 1500)
        return;
    } else
    {
      this.setState({lastrun:n});
    }

    const bounds = e.target.getBounds();
        let tempshops = this.state.shops.filter((shop) => (    
          bounds._northEast.lat > shop.geometry.coordinates[0] && 
          bounds._northEast.lng > shop.geometry.coordinates[1] &&
          bounds._southWest.lat < shop.geometry.coordinates[0] && 
          bounds._southWest.lng < shop.geometry.coordinates[1] 
        ));
        this.setState({tempshops:tempshops});
        this.setState({single:false})
   }

  componentDidMount() {
    axios.get(`https://powerful-wildwood-94772.herokuapp.com/leaf`)
      .then(res => {
        const shops = res.data;

        shops.forEach((shop) => {
          let tempshop = {
            "id": shop.id, "type": "Feature", "properties": { "Name": shop.title, "address": shop.address,  "telephone": shop.telephone, "zip": shop.zip, "description": shop.description, "statecode": shop.statecode, "city": shop.city }, "geometry": { "type": "Point", "coordinates": [  parseFloat(shop.lat),parseFloat(shop.long) ] } 
          };
         this.state.shops.push(tempshop);
        });
        //console.log(this.state.shops)
      }) 
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const locateOptions = {
      position: 'topright',
      strings: {
          title: 'Show me where I am, yo!'
      },
      keepCurrentZoomLevel: true,
      flyTo: true,
      onActivate: () => {} // callback before engine starts retrieving locations
    }
    
    return (

      <div className="flex">
        <div id="map2" className="w-3/5">

          <Map  
            ref={this.refMap}
            onMoveend={this.onMoveEnd} className="markercluster-map"  style={{ height: "100vh" }} center={position} zoom={this.state.zoom} maxZoom={18}>
            
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <LocateControl options={locateOptions} startDirectly/>

          <MarkerClusterGroup disableClusteringAtZoom={13}>
            <ListShops shops={this.state.tempshops} func={this.handleShopClick}/>
          </MarkerClusterGroup>
         
          </Map>
        </div>
        {this.state.single===false ? <RightListShops shops={this.state.tempshops} func={this.handleShopClick}/> : <RightSingle  shop={this.state.singleinfo} closeRightSingle={this.closeRightSingle}/>}
      </div>
    );
  }
}
