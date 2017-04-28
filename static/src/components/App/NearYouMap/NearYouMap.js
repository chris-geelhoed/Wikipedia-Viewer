import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';
import './NearYouMap.css';

const coords = {
  lat: 49.2827,
  lng: -123.1207,
}

const params = {
  v: '3.exp',
  key: 'AIzaSyDJCdjeV5EymdowQdz-C2e-FCKzfu0okpI'
}

class NearYouMap extends Component {
  handleClick(e) {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();
    console.log(`Click at latitude = ${latitude} and longitude = ${longitude}`)
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Gmaps className="nearYouMap"
            lat={coords.lat}
            lng={coords.lng}
            zoom={12}
            loadingMessage={'Be happy'}
            params={params}
            onMapCreated={console.log("loaded!")}
            onClick={this.handleClick.bind(this)}
          >
            <Marker
              lat={coords.lat}
              lng={coords.lng}
              draggable={true}
              onDragEnd={this.onDragEnd} />
          </Gmaps>
        </div>
      </div>
    );
  }
}

/*
const mapStateToProps = (state) => {
  return {
    query: state.search.query,
    lastQuery: state.search.lastQuery,
    data: state.data
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    appStarted: appStarted
  }, dispatch);
}
*/

//export default connect(mapStateToProps, matchDispatchToProps)(Map);

export default NearYouMap;