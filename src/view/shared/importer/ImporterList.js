import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import ImporterRowStatus from 'view/shared/importer/ImporterRowStatus';
import Pagination from 'view/shared/table/Pagination';
import TableCellCustom from 'view/shared/table/TableCellCustom';
import {
  TableBody,
  TableRow,
  TableCell,
  Table,
  Box,
  TableHead,
} from '@material-ui/core';

export default (selectors, actions, fields) => {
  class ImporterList extends Component {
    labelDisplayedRows = (from, to, count) => {
      const {
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      } = this.props;
      return i18n(
        'importer.total',
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      );
    };

    doChangeSort = (columnKey) => {
      const { dispatch, sorter, rows } = this.props;

      const order =
        sorter.columnKey === columnKey &&
        sorter.order === 'asc'
          ? 'desc'
          : 'asc';

      dispatch(
        actions.doChangeSort(rows, {
          columnKey,
          order,
        }),
      );
    };

    doChangePagination = (pagination) => {
      const { dispatch } = this.props;
      dispatch(actions.doChangePagination(pagination));
    };

    render() {
      const {
        currentPageRows,
        pagination,
        sorter,
      } = this.props;

      return (
        <React.Fragment>
          <Box
            style={{
              display: 'block',
              width: '100%',
              overflowX: 'auto',
            }}
          >
            <Table
              style={{
                borderRadius: '5px',
                border: '1px solid rgb(224, 224, 224)',
                borderCollapse: 'initial',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCellCustom
                    onSort={this.doChangeSort}
                    hasRows={true}
                    sorter={sorter}
                    name="_line"
                    label={i18n('importer.line')}
                  />
                  {fields.map((schemaItem) => (
                    <TableCellCustom
                      key={schemaItem.name}
                      onSort={this.doChangeSort}
                      hasRows={true}
                      sorter={sorter}
                      name={schemaItem.name}
                      label={schemaItem.label}
                    />
                  ))}
                  <TableCellCustom
                    onSort={this.doChangeSort}
                    hasRows={true}
                    sorter={sorter}
                    name="_status"
                    label={i18n('importer.status')}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageRows.map((row) => (
                  <TableRow key={row._line}>
                    <TableCell>{row._line}</TableCell>
                    {fields.map((schemaItem) => (
                      <TableCell key={schemaItem.name}>
                        {row[schemaItem.name]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <ImporterRowStatus
                        value={row._status}
                        errorMessage={row._errorMessage}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Pagination
            onChange={this.doChangePagination}
            pagination={pagination}
            labelDisplayedRows={this.labelDisplayedRows}
          />
        </React.Fragment>
      );
    }
  }

  function select(state) {
    return {
      rows: selectors.selectRows(state),
      currentPageRows: selectors.selectCurrentPageRows(
        state,
      ),
      pendingRowsCount: selectors.selectPendingRowsCount(
        state,
      ),
      errorRowsCount: selectors.selectErrorRowsCount(state),
      importedRowsCount: selectors.selectImportedRowsCount(
        state,
      ),
      sorter: selectors.selectSorter(state),
      pagination: selectors.selectPagination(state),
    };
  }

  return connect(select)(ImporterList);
};
