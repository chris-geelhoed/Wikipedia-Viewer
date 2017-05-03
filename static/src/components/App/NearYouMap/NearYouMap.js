import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './NearYouMap.css';

import clickedMap from '../../../actionCreators/clickedMap/clickedMap.js';

const params = {
  v: '3.exp',
  key: 'AIzaSyDJCdjeV5EymdowQdz-C2e-FCKzfu0okpI'
}

class NearYouMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.coords.lat,
      lng: this.props.coords.long,
    }
  }
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: false,
      draggableCursor: "default",
    });
  }
  handleClick(e) {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.props.clickedMap({
      lat: latitude,
      long: longitude,
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Gmaps className="nearYouMap"
            lat={this.props.coords.lat}
            lng={this.props.coords.long}
            zoom={6}
            loadingMessage={'Be happy'}
            params={params}
            onMapCreated={this.onMapCreated}
            onClick={this.handleClick.bind(this)}
          >
            <Marker
              lat={this.state.lat}
              lng={this.state.lng}
              draggable={true}
              onDragEnd={this.onDragEnd} />
          </Gmaps>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coords: state.data.location.coords
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clickedMap: clickedMap
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NearYouMap);
