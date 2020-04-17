import React, { Component } from 'react';
import {
  TableCell,
  TableSortLabel,
} from '@material-ui/core';

class TableCellCustom extends Component {
  render() {
    const {
      sorter,
      onSort,
      name,
      label,
      hasRows,
      children,
      size = "auto",
      ...rest
    } = this.props;

    const style = {
      auto: {},
      sm: {
        width: '80px',
      },
      md: {
        width: '180px'
      }
    }[size] || {};

    if (!hasRows || !onSort) {
      return (
        <TableCell style={style} {...rest}>
          {children || label || ''}
        </TableCell>
      );
    }

    return (
      <TableCell
        key={name}
        style={style}
        sortDirection={
          sorter.columnKey === name ? sorter.order : false
        }
      >
        <TableSortLabel
          active={sorter.columnKey === name}
          direction={sorter.order}
          onClick={() => onSort(name)}
        >
          {children || label || ''}
        </TableSortLabel>
      </TableCell>
    );
  }
}

export default TableCellCustom;
