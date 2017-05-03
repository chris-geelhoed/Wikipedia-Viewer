import React, { Component } from 'react';

class LoadingMapMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "...",
      tick: function() {},
    }
  }
  tick() {
    const delay = 500;
    return setInterval(() => {
      this.setState((prevState) => {
        return {
          message: prevState.message === "..." ?
            "." : prevState.message += "."
        }
      });
    }, delay);
  }
  componentWillMount() {
    this.setState({
      tick: this.tick()
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.tick);
  }
  render() {
    return (
      <span>{this.state.message}</span>
    );
  }
}

export default LoadingMapMessage;