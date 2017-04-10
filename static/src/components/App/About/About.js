import React, { Component } from 'react';
import './About.css';

class About extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 background">
                    <div className="page-header"><h4>About This Webpage</h4></div>
                    <p>
                        The purpose of this webpage is to help people learn more about the issues being discussed in their local and global community without reliance on any specific news provider.
                         This is done by monitoring social media for trending topics and then finding popular Wikipedia articles relating to those discussions.
                         To learn more about the inner workings of this project you can visit the Github repository <a style={{color: "#4267b2"}}href="https://github.com/RadDog25/Wikipedia-Viewer" target="_blank" >here</a>.
                   </p>
                </div>
            </div>
        );
    }
}

export default About;