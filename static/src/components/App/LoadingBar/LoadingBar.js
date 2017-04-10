import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import './LoadingBar.css';

class LoadingBar extends Component {
    render() {
        return (
            <div className="row">
                {this.props.loading &&
                    <div className="col-md-12 loadingBarBackground">
                        <ProgressBar now={this.props.progress} />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        progress: state.data.progress,
        loading: state.data.loading
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(LoadingBar);