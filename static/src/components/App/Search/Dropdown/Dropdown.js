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
                        [
                            { title: "Near You", icon: "map-marker", class: "nearYou" },
                            { title: "Worldwide", icon: "globe", class: "worldwide" },
                            { title: "Popular Searches", icon: "fire", class: "popular" },
                            { title: "Most Liked", icon: "thumbs-up", class: "mostLiked" },
                            { title: "About", icon: "asterisk", class: "about" }
                        ].map((item, index) => {
                            return <DropdownItem
                                title={item.title}
                                icon={item.icon}
                                class={item.class}
                                index={index}
                                key={index}
                            />;
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