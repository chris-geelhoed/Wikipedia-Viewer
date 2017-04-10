import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Search.css';
import Categories from './Categories/Categories.js';
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
                    <div className="col-xs-2 col-md-1">
                        <a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank" >
                            <img src={wikiLogo} alt="wikipedia W" />
                        </a>
                    </div>
                    <div className="col-xs-10 col-md-11">
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
                    <div className="col-xs-12">
                        <Categories />
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