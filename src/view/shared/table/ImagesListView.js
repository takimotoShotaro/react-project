import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

class ImagesListView extends Component {
  valueAsArray = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  render() {
    if (
      !this.valueAsArray().length ||
      !this.valueAsArray()[0].publicUrl
    ) {
      const src = "/images/userImages/" + this.props.id.charAt(0) + '.jpg';
      return <Avatar src={src} />;
    }

    const src = this.valueAsArray()[0].publicUrl;
    return <Avatar src={src} />;
  }
}

ImagesListView.propTypes = {
  src: PropTypes.any,
};

export default ImagesListView;
