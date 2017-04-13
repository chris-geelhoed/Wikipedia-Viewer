import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import TestUtils, { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate,
scryRenderedDOMComponentsWithClass as findByClass } from 'react-addons-test-utils';
const renderer = TestUtils.createRenderer();

function mount(Component, props) {
    return renderIntoDocument(<Component { ...props } />);
}

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 1
    }
  }
  handleClick() {
    this.setState((prevState, props) => ({
      message: prevState.message + 1
    }));
  }
  render() {
    return <h1 className="hello" onClick={this.handleClick.bind(this)}>{this.state.message}</h1>
  }
}

it("updates on click", function () {
  const component = mount(Hello);
  const node = findDOMNode(component);
  //Simulate.click(findByClass(component, "hello")[0]);
  Simulate.click(node);
  expect(node.textContent).toBe("2");  
});