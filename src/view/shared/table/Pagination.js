import React, { Component } from 'react';
import PaginationWrapper from 'view/shared/table/styles/PaginationWrapper';
import { i18n } from 'i18n';
import PropTypes from 'prop-types';
import { TablePagination } from '@material-ui/core';
import withWidth, {
  isWidthUp,
} from '@material-ui/core/withWidth';

class Pagination extends Component {
  onChangeRowsPerPage = (pageSize) => {
    this.props.onChange({
      current: 1,
      pageSize: pageSize || 10,
    });
  };

  onChangePage = (event, current) => {
    const pageSize = Number(
      this.props.pagination.pageSize || 10,
    );
    this.props.onChange({
      current: current + 1,
      pageSize,
    });
  };

  render() {
    const { pagination } = this.props;
    const { current, pageSize, total } = pagination;
    const labelDisplayedRows =
      this.props.labelDisplayedRows ||
      (({ from, to, count }) =>
        i18n(
          'pagination.labelDisplayedRows',
          from,
          to,
          count,
        ));

    const isSmUp = isWidthUp('sm', this.props.width);

    return (
      <PaginationWrapper>
        <TablePagination
          labelDisplayedRows={labelDisplayedRows}
          labelRowsPerPage={
            isSmUp
              ? i18n('pagination.labelRowsPerPage')
              : ''
          }
          rowsPerPageOptions={[10, 20, 30, 40]}
          component="div"
          count={total}
          rowsPerPage={Number(pageSize)}
          page={current - 1}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={(event) =>
            this.onChangeRowsPerPage(+event.target.value)
          }
        />
      </PaginationWrapper>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default withWidth()(Pagination);
