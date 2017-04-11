import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import './Dropdown.css';
import { clickedDropdown } from '../../../../actionCreators/clickedDropdown/clickedDropdown.js';
import DropdownItem from './DropdownItem/DropdownItem.js';

class Dropdown extends Component {
    handleToggle() {
        this.props.clickedDropdown();
    }
    render() {
        return (
            <Nav>
                <NavDropdown onToggle={this.handleToggle.bind(this)} open={this.props.open} eventKey={3} title={
                    <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                } id="basic-nav-dropdown">
                    {
                        ["Near You", "Worldwide", "Popular Searches", "Most Liked","About"].map((title, index) => {
                            return <DropdownItem title={title} index={index} key={index} />;
                        })
                    }
                </NavDropdown>
            </Nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.dropdown.open
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clickedDropdown: clickedDropdown
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Dropdown);