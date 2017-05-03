import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MenuItem } from 'react-bootstrap';
import jump from 'jump.js';
import { clickedDropdownItem } from '../../../../../actionCreators/clickedDropdown/clickedDropdown.js';
import './DropdownItem.css';

class DropdownItem extends Component {
    handleClick() {
        jump(`.${this.props.class}`, {
            offset: -90 //this offset makes up for the space of the fixed search bar
        });
        this.props.clickedDropdownItem();
    }
    render() {
        return (
            <MenuItem onClick={this.handleClick.bind(this)} eventKey={this.props.index}>
                <span className={`myGlyph glyphicon glyphicon-${this.props.icon}`} aria-hidden="true"></span>
                <span className="dropDownItem">{this.props.title}</span>
            </MenuItem>
        );
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clickedDropdownItem: clickedDropdownItem
    }, dispatch);
}

export default connect(null, matchDispatchToProps)(DropdownItem);