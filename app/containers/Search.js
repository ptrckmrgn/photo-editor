import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {fetchPhotos, selectPhoto} from '../actions';
import SearchButton from '../components/SearchButton';
import PhotoList from '../components/PhotoList';

class Search extends Component {
    render() {
        return (
            <div>
                <SearchButton fetchPhotos={this.props.fetchPhotos} />
                <PhotoList photos={this.props.photos} selectPhoto={this.props.selectPhoto} />
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         photos: fetchPhotos()
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onSelectPhoto: id => {
//             dispatch(selectPhoto(id))
//         }
//     };
// }

const mapStateToProps = state => {
    return { photos: state.photos };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchPhotos, selectPhoto }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);