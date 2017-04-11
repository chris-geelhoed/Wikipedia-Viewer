import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import Search from './Search/Search.js';
import Slideshow from './Slideshow/Slideshow.js';
import About from './About/About.js';
import LoadingBar from './LoadingBar/LoadingBar.js';
import appStarted from '../../actionCreators/appStarted/appStarted.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.appStarted(); //trigger that app has started and send request for startup data to server
  }
  render() {
    return (
      <div className="App">
        <Search />
        <LoadingBar />
        <Slideshow
        title={`${this.props.data && this.props.data.userSearch? this.props.data.userSearch.length : 0 } results for: "${this.props.lastQuery}"`}
        lastQuery={this.props.lastQuery}
        wikiData={this.props.data.userSearch}/>
        <Slideshow title="Trending Near You" sortBy="pageviews" wikiData={this.props.data.nearYou}/>
        <Slideshow title="Trending Worldwide" sortBy="pageviews" wikiData={this.props.data.worldwide}/>
        <Slideshow title="Popular Searches" sortBy="pageviews" wikiData={this.props.data.popular}/>
        <Slideshow title="Most Liked" sortBy="likes" wikiData={this.props.data.mostLiked}/>
        <About />
      </div>
    );
  }
}

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

export default connect(mapStateToProps, matchDispatchToProps)(App);