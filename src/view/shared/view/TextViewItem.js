import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

class TextViewItem extends Component {
  render() {
    if (
      !this.props.value &&
      this.props.value !== 0 &&
      this.props.value !== false
    ) {
      return null;
    }

    const value = `${
      this.props.prefix ? `${this.props.prefix} ` : ''
    }${this.props.value}`;

    return (
      <div style={{ marginBottom: '16px' }}>
        <Typography variant="subtitle2">
          {this.props.label}
        </Typography>
        <Typography variant="subtitle1">{value}</Typography>
      </div>
    );
  }
}

TextViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  prefix: PropTypes.string,
};

export default TextViewItem;
