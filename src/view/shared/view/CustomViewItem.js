import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

class CustomViewItem extends Component {
  isBlank() {
    return (
      (!this.props.value &&
        this.props.value !== 0 &&
        this.props.value !== false) ||
      (Array.isArray(this.props.value) &&
        !this.props.value.length)
    );
  }

  render() {
    if (this.isBlank()) {
      return null;
    }

    return (
      <div style={{ marginBottom: '16px' }}>
        <Typography variant="subtitle2">
          {this.props.label}
        </Typography>
        {this.props.render(this.props.value)}
      </div>
    );
  }
}

CustomViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  render: PropTypes.func,
};

export default CustomViewItem;
