import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Translate } from 'react-i18nify';
import Dropzone from 'react-dropzone';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactCrop from 'react-image-crop';
import Loading from '../../components/Loading';
import Avatar from './Avatar';

const defaultCrop = { x: 0, y: 0, width: 100, aspect: 1 };

class AvatarUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cropping: false,
      selectedFile: null,
      imageContent: null,
      crop: defaultCrop,
      pixelCrop: null,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCropChanged = this.onCropChanged.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.upload = this.upload.bind(this);
  }

  onSelect(files) {
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    this.setState({
      selectedFile: file,
    });

    const component = this;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      component.setState({
        imageContent: evt.target.result,
      });
      component.toggleModal();
    };
  }

  onCropChanged(crop, pixelCrop) {
    this.setState({
      crop,
      pixelCrop,
    });
  }

  onImageLoaded(_crop, _image, pixelCrop) {
    this.setState({
      pixelCrop,
    });
  }

  toggleModal() {
    this.setState({
      cropping: !this.state.cropping,
    });
  }

  upload() {
    this.toggleModal();
    this.props.onUpload(this.state.selectedFile, this.state.pixelCrop);
  }

  render() {
    return (
      <div className="avatar-form">
        <Dropzone
          onDrop={this.onSelect}
          multiple={false}
          className="avatar-upload"
          accept="image/*"
        >
          <Avatar {...this.props.user} />
          <div className="avatar-overlay">
            <img src="/images/upload.svg" alt="" />
          </div>
          {this.props.uploading && <Loading />}
        </Dropzone>
        <Modal
          isOpen={this.state.cropping}
          toggle={this.toggleModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>
            <Translate value="users.avatar.cropTitle" />
          </ModalHeader>
          <ModalBody>
            {this.state.imageContent && (
            <ReactCrop
              src={this.state.imageContent}
              crop={this.state.crop}
              onComplete={this.onCropChanged}
              onImageLoaded={this.onImageLoaded}
            />)}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
              <Translate value="users.avatar.cropCancel" />
            </Button>
            {' '}
            <Button color="primary" onClick={this.upload}>
              <Translate value="users.avatar.cropUpload" />
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

AvatarUpload.propTypes = {
  user: PropTypes.shape({
    color: PropTypes.string,
    initials: PropTypes.string,
  }),
  onUpload: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
};

AvatarUpload.defaultProps = {
  user: {},
};

export default AvatarUpload;
