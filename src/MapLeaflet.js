import "./Map.css";
import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import axios from 'axios';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import LocateControl from './LocateControl';
require('react-leaflet-markercluster/dist/styles.min.css');

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [13, 0]
});

  function ListShops(props) {
    const shops = props.shops;
    const show = shops.map((shop) =>
        <Marker key={shop.id} position={shop.geometry.coordinates} icon={customMarker}>
            <Popup>
                {shop.properties.Name}
            </Popup>
        </Marker>
    );
    
    return (  
        <>  
        {show}
        </> 
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
      shops: []
    };
  }

  componentDidMount() {
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
           this.setState({ shops: this.state.tempshops });
          
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

      
      <div id="map">
  <div className="flex flex-col w-3/4 mx-auto my-12 items-center">
      <h1>Super cool page</h1>
    I am a button
    </div>
        
        <Map className="markercluster-map"  style={{ height: "100vh" }} center={position} zoom={this.state.zoom} maxZoom={18}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
           <LocateControl options={locateOptions} startDirectly/>

        <MarkerClusterGroup disableClusteringAtZoom={13}>
          <ListShops shops={this.state.tempshops} />
        </MarkerClusterGroup>
    
        </Map>
      </div>
    );
  }
}
