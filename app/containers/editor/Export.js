import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CtrlExport from '../../components/editor/CtrlExport';

class Export extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quality: '0.9',
            image: null,
            filesize: '0 KB',
        };

        this.onChangeQuality = this.onChangeQuality.bind(this);
        this.onClickDownload = this.onClickDownload.bind(this);
    }

    getImage(quality) {
        quality = parseFloat(quality);
        const image = this.props.cropper.getCroppedCanvas({
            beforeDrawImage: (canvas) => {
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;
                ctx.imageSmoothingQuality = 'high';
            }
        }).toDataURL('image/jpeg', quality);

        return image;
    }

    getImageSize(file) {

        const head = 'data:image/jpeg;base64,';
        let filesize = _.round((file.length - head.length) * (3 / 4) / 1000);

        if (filesize.toString().length > 3) {
            filesize = _.round(filesize / 1000, 2) + ' MB';
        }
        else {
            filesize = filesize + ' KB';
        }

        return filesize;
    }

    onChangeQuality(quality) {
        const image = this.getImage(quality);
        const filesize = this.getImageSize(image);

        this.setState({quality, image, filesize});
    }

    onClickDownload(event) {
        const link = event.target;
        link.href = this.state.image;
        link.download = 'test.jpg';
    }

    componentDidMount() {
        const image = this.getImage(this.state.quality);
        const filesize = this.getImageSize(image);
        this.setState({image, filesize});
    }

    render() {
        return (
            <div>
                <CtrlExport
                    quality={this.state.quality}
                    filesize={this.state.filesize}

                    onChangeQuality={this.onChangeQuality}
                    onClickDownload={this.onClickDownload}
                />
            </div>
        );
    }
}


// TODO
Export.propTypes = {
    cropper: PropTypes.object.isRequired
}

export default Export;