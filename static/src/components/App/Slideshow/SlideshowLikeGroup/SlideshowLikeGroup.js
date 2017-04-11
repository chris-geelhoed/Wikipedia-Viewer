import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clickedLike from '../../../../actionCreators/clickedLike/clickedLike.js';

class SlideshowLikeGroup extends Component {
    handleClick() {
        this.props.clickedLike(Object.assign({}, {
            page: this.props.page
        }, {
            wikiData: this.props.wikiData
        }));
    }
    render() {
        return (
            <span className="likeGroup">
                <span onClick={this.handleClick.bind(this)} className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
                {" "}{this.props.page.likes ? this.props.page.likes : 0}
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