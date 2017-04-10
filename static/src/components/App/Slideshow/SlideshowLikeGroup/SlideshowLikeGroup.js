import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clickedLike from '../../../../actionCreators/clickedLike/clickedLike.js';

class SlideshowLikeGroup extends Component {
    handleClick() {
        this.props.clickedLike(Object.assign({}, this.props, {
            wikiData: this.props.wikiData
        }));
    }
    render() {
        return (
            <span className="likeGroup">
                <span onClick={this.handleClick.bind(this)} className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                {" "}{this.props.likes}
            </span>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    wikiData: state.data
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
      clickedLike: clickedLike
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SlideshowLikeGroup);