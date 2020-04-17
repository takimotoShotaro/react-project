import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FilesUploader from 'view/shared/uploaders/FilesUploader';
import { Typography } from '@material-ui/core';

class FilesViewItem extends Component {
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
        <FilesUploader
          readonly
          value={this.valueAsArray()}
        />
      </div>
    );
  }
}

FilesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default FilesViewItem;
