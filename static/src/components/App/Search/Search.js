import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Search.css';
import Dropdown from './Dropdown/Dropdown.js';
import changedSearch from '../../../actionCreators/changedSearch/changedSearch.js';
import submittedSearch from '../../../actionCreators/submittedSearch/submittedSearch.js';
import wikiLogo from './logo.png';

class Search extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.submittedSearch(this.props.query);
    }
    handleChange(e) {
        this.props.changedSearch(e.target.value);
    }
    render() {
        return (
            <div className="jumbotron">
                <div className="row">
                    <div className="myDropdown col-xs-1 col-md-1">
                        <Dropdown />
                    </div>
                    <div className="myLogo col-xs-1 col-md-1">
                        <img src={wikiLogo} alt="wikipedia W" />
                    </div>
                    <div className="mySearch col-xs-10 col-md-10">
                        <form onSubmit={this.handleSubmit.bind(this)} >
                            <div className="input-group">
                                <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Search Wikipedia..." />
                                <span className="input-group-btn">
                                    <button onClick={this.handleSubmit.bind(this)}
                                        className="btn" type="button">
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        query: state.search.query
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changedSearch: changedSearch,
        submittedSearch: submittedSearch
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);