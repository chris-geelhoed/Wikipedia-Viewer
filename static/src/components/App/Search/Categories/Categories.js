import React, { Component } from 'react';
import './Categories.css';
import CategoryPill from './CategoryPill/CategoryPill.js';

class Categories extends Component {
    render() {
        return (
            <ul className="nav nav-pills">
                {
                    ["Near You", "Worldwide", "Popular"].map((title, index) => {
                        return <CategoryPill title={title} key={index} />;
                    })
                }
            </ul>
        );
    }
}

export default Categories;