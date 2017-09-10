import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchPhotos, selectPhoto } from '../actions';

class PhotoList extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (!nextProps.photos) {
    //         return false;
    //     }
    // }

    renderPhotos() {
        return _.map(this.props.photos, photo => {
            return (
                <li
                    className="list-group-item"
                    key={photo.id}
                    onClick={() => this.props.selectPhoto(photo)}
                >
                    <img src={photo.urls.thumb} />
                </li>
            );
        });
    }

    render() {
        // if (Object.keys(this.props.photos).length === 0) {
        //     return (
        //         <h3>Photos</h3>
        //     );
        // }

        return (
            <div>
                <h3>Photos</h3>
                <ul className="list-group">
                    {this.renderPhotos()}
                </ul>
            </div>
        )
    }
}

export default PhotoList;