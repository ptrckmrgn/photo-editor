import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchPhotos, selectPhoto } from '../actions';

class SearchButton extends Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.fetchPhotos()}>
                    Get Photos
                </button>
            </div>
        )
    }
}

export default SearchButton;

//
// const SearchButton = ({ photos, fetchPhotos, selectPhoto }) => (
//     <div>
//         <button onClick={() => fetchPhotos()}>
//             Get Photos
//         </button>
//         <button onClick={() => selectPhoto('v_eeqDEFVTY')}>
//             Select Photo
//         </button>
//     </div>
// );


// class SearchButton extends Component {
//     constructor(props) {
//         super(props);
//
//         // this.state = {
//         //     term: ''
//         // };
//     }
//
//     // componentDidMount() { // TODO: replace with search
//     //     this.props.fetchPhotos();
//     // }
//
//     // onButtonClick() { // TODO: replace with selection of a returned picture
//     //     this.props.selectPhoto(this.props.photos['v_eeqDEFVTY']);
//     // }
//
//     render() {
//         return (
//
//         )
//     }
// }
//
// function mapStateToProps(state) {
//     return { photos: state.photos };
// }
//
// export default connect(mapStateToProps, { fetchPhotos })(SearchButton);