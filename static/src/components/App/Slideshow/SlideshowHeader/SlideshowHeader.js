import React, { Component } from 'react';

class SlideshowHeader extends Component {
    render() {
        return (
            <div className={`page-header ${this.props.title.replace(/(Trending|\s)/g, "")}`}>
                    <h4 style={{color: "#4267b2"}}>
                        {this.props.title}
                    </h4>
            </div>
        );
    }
}

export default SlideshowHeader;