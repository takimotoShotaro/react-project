import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImagesUploader from 'view/shared/uploaders/ImagesUploader';
import { Typography } from '@material-ui/core';

class ImagesViewItem extends Component {
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
    if (!this.valueAsArray().length) {
      return null;
    }

    return (
      <div style={{ marginBottom: '16px' }}>
        <Typography variant="subtitle2">
          {this.props.label}
        </Typography>
        <ImagesUploader
          readonly
          value={this.valueAsArray()}
        />
      </div>
    );
  }
}

ImagesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default ImagesViewItem;
