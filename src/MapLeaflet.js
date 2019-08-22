import "./Map.css";
import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import axios from 'axios';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import LocateControl from './LocateControl';
import RightSingle from "./RightSingle";
import { authHeader } from './auth/AuthHeader';

require('react-leaflet-markercluster/dist/styles.min.css');

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [13, 0]
});

const images =['https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_20-55-53_hdt5kw.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_22-15-03_x1ckgx.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-02-21_09-04-29_zqqkka.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051280/Screenshot_from_2019-07-04_10-18-31_maxm35.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/Screenshot_from_2019-02-21_20-58-54_aqak0f.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/Screenshot_from_2019-07-04_10-47-10_tbbi9q.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051278/Screenshot_from_2019-07-04_18-34-55_edsg5l.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051278/Screenshot_from_2019-07-04_14-41-35_ua0yxi.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/bella2_g8y0iq.png', 'https://res.cloudinary.com/dcdv6emgi/image/upload/w_400/v1565051279/bella2_g8y0iq.png'];

function returnRandomImage(id){
  const random = id.toString().split('').pop();
  console.log(images[random])
  return images[random];
}

function RightListShops(props) {
  const shops = props.shops;
    const show = shops.map((shop) => 
        <div key={shop.id} className="p-3 m-2 xl:w-5/12 lg:w-full rounded overflow-hidden shadow-lg">
          <img className=" h-32 w-full overflow-hidden"  alt="" src={returnRandomImage(shop.id)}  className="object-cover object-top h-48 w-full overflow-hidden" ></img>
            <div className="font-bold text-l mb-2"> {shop.properties.Name}</div>
            <p v-if="data.properties.Zip" className="text-grey-darker text-sm">
            
              </p>
              <p className="text-grey-darker text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            <div>
              (978) 213-8369
            </div>
            <div>
              1258 Gorham St.
              Lowell, MA 01852
            </div>
        </div> 
    );

    return (  
      <div className="w-2/5 flex flex-row flex-wrap overflow-auto p-8 items-stretch h-screen justify-around">  
      {show}
      </div> 
  );

  }
// may need to change the functional component here to a class component to allow refs to be added


  function ListShops(props) {
    const shops = props.shops;
    const show = shops.map((shop) =>
        <Marker key={shop.id} position={shop.geometry.coordinates} icon={customMarker} onClick={(e) => props.func(e,shop.id)}>
            <Popup>
                {shop.properties.Name}
                <img src="testinghere" />
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
    this.refMap = React.createRef();
  }

  handleShopClick(e, shopid) {
    const popup = e.target.getPopup();
    const content = popup.setContent('yeah');
   
    

    axios.get(`http://localhost:3000/shop/`+shopid)
    .then(res => {
      this.setState({ singleinfo: res.data });
      this.setState({single:true})
     
    }) 
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
        const tempshops = this.state.shops.filter((shop) => (    
          bounds._northEast.lat > shop.geometry.coordinates[0] && 
          bounds._northEast.lng > shop.geometry.coordinates[1] &&
          bounds._southWest.lat < shop.geometry.coordinates[0] && 
          bounds._southWest.lng < shop.geometry.coordinates[1] 
        ));

        this.setState({toshowshops:tempshops});

   }

  componentDidMount() {

    const { match: { params } } = this.props;
    console.log(params.id)

    axios.get(`http://localhost:3000/leaf`)
      .then(res => {
        const shops = res.data;
       
        shops.map(shop => {
            let tempshop = {
              "id": shop.id, "type": "Feature", "properties": { "Name": shop.title, "Zip": shop.zip }, "geometry": { "type": "Point", "coordinates": [  parseFloat(shop.lat),parseFloat(shop.long) ] } 
            };
           this.state.tempshops.push(tempshop);
           // 
          })
          // this.setState({ singleinfo: res.data });
          
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
    
        {this.state.single===false ? <RightListShops shops={this.state.toshowshops} /> : <RightSingle  shop={this.state.singleinfo} />}
      </div>
    );
  }
}
