import React, { Component } from 'react';
import { Chip } from '@material-ui/core';

class ColoredChip extends Component {
  render() {
    const { color, label } = this.props;

    const backgroundColors = {
      green: '#28a745',
      red: '#dc3545',
      yellow: '#ffc107',
    };

    const textColors = {
      green: '#fff',
      red: '#fff',
      yellow: '#fff',
    };

    const style = color
      ? {
          backgroundColor: backgroundColors[color],
          color: textColors[color],
        }
      : {};

    return (
      <Chip size="small" style={style} label={label} />
    );
  }
}

export default ColoredChip;
