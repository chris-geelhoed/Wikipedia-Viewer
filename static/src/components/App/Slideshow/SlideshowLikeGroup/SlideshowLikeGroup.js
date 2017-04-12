import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clickedLike from '../../../../actionCreators/clickedLike/clickedLike.js';

class SlideshowLikeGroup extends Component {
    handleClick() {
        /* Only want to trigger the action once the previous like request has been processed */
        if (!this.props.loadingLikeData) {
            this.props.clickedLike(Object.assign({}, {
                page: this.props.page
            }, {
                    wikiData: this.props.wikiData
                }));
        }
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
        wikiData: state.data,
        loadingLikeData: state.data.loadingLikeData,
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clickedLike: clickedLike
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SlideshowLikeGroup);