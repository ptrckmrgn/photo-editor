import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './Search';
import Editor from './Editor';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // if (!this.props.photo) {
        //     return (
        //         <Search />
        //     );
        // }

        return (
            <div>
                <Editor
                    photo={this.props.photo}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        photo: state.photo
    };
}

export default connect(mapStateToProps)(App);