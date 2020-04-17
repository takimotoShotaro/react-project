import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import { i18n } from 'i18n';
import actions from 'modules/auditLog/auditLogActions';
import model from 'modules/auditLog/auditLogModel';
import selectors from 'modules/auditLog/auditLogSelectors';
import { Component, default as React } from 'react';
import { connect } from 'react-redux';
import Spinner from 'view/shared/Spinner';
import Pagination from 'view/shared/table/Pagination';
import TableCellCustom from 'view/shared/table/TableCellCustom';

const { fields } = model;

class AuditLogTable extends Component {
  doOpenSelectdValues(values) {
    const data = JSON.stringify(values, null, 2);
    const jsonWindow = window.open(
      '',
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400',
    );
    jsonWindow.document.write(`<pre>${data}</pre>`);
  }

  doChangeSort = (columnKey) => {
    const { dispatch, sorter } = this.props;

    const order =
      sorter.columnKey === columnKey &&
      sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
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
      pagination,
      rows,
      loading,
      hasRows,
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
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.timestamp.name}
                  label={fields.timestamp.label}
                />

                <TableCellCustom
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.createdByEmail.name}
                  label={fields.createdByEmail.label}
                />

                <TableCellCustom
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.entityName.name}
                  label={fields.entityName.label}
                />

                <TableCellCustom
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.action.name}
                  label={fields.action.label}
                />

                <TableCellCustom
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.entityId.name}
                  label={fields.entityId.label}
                />

                <TableCellCustom size="sm"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={100}>
                    <Spinner />
                  </TableCell>
                </TableRow>
              )}
              {!loading && !hasRows && (
                <TableRow>
                  <TableCell colSpan={100}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {i18n('table.noData')}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {fields.timestamp.forView(
                        row[fields.timestamp.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {fields.createdByEmail.forView(
                        row[fields.createdByEmail.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {fields.entityName.forView(
                        row[fields.entityName.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {fields.action.forView(
                        row[fields.action.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {fields.entityId.forView(
                        row[fields.entityId.name],
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title={i18n('common.view')}>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            this.doOpenSelectdValues(
                              row[fields.values.name],
                            )
                          }
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>

        <Pagination
          onChange={this.doChangePagination}
          disabled={loading}
          pagination={pagination}
        />
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    hasRows: selectors.selectHasRows(state),
    sorter: selectors.selectSorter(state),
  };
}

export default connect(select)(AuditLogTable);
