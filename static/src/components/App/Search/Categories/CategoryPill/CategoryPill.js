import React, { Component } from 'react';
import './CategoryPill.css';
import jump from 'jump.js';

class CategoryPill extends Component {
    handleClick() {
        jump(`.${this.props.title.replace(" ", "")}`);
    }
    render() {
        return (
            <li onClick={this.handleClick.bind(this)} role="presentation">
                <a href={`#${this.props.title}`}>{
                    this.props.title}
                </a>
            </li>
        );
    }
}

export default CategoryPill;