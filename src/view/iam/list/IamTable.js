import React, { Component } from 'react';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/list/users/iamListUsersSelectors';
import actions from 'modules/iam/list/users/iamListUsersActions';
import Roles from 'security/roles';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import model from 'modules/auth/userModel';
import Pagination from 'view/shared/table/Pagination';
import Spinner from 'view/shared/Spinner';
import { Box, Avatar } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import ColoredChip from 'view/shared/ColoredChip';
import TableCellCustom from 'view/shared/table/TableCellCustom';

const { fields } = model;

class IamTable extends Component {
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

  doToggleAllSelected = () => {
    const { dispatch } = this.props;
    dispatch(actions.doToggleAllSelected());
  };

  doToggleOneSelected = (id) => {
    const { dispatch } = this.props;
    dispatch(actions.doToggleOneSelected(id));
  };

  render() {
    const {
      pagination,
      rows,
      loading,
      isAllSelected,
      selectedKeys,
      sorter,
      hasRows,
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
                <TableCellCustom padding="checkbox">
                  {hasRows && (
                    <Checkbox
                      checked={!!isAllSelected}
                      onChange={() =>
                        this.doToggleAllSelected()
                      }
                    />
                  )}
                </TableCellCustom>
                <TableCellCustom>
                  {fields.avatarsIam.label}
                </TableCellCustom>
                <TableCellCustom
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.email.name}
                  label={fields.email.label}
                />
                <TableCellCustom
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.fullName.name}
                  label={fields.fullName.label}
                />
                <TableCellCustom>
                  {fields.roles.label}
                </TableCellCustom>
                <TableCellCustom
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.disabledAsStatus.name}
                  label={fields.disabledAsStatus.label}
                />
                <TableCellCustom
                  onSort={this.doChangeSort}
                  hasRows={hasRows}
                  sorter={sorter}
                  name={fields.createdAt.name}
                  label={fields.createdAt.label}
                />
                <TableCellCustom></TableCellCustom>
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedKeys.includes(
                          row.id,
                        )}
                        onChange={() =>
                          this.doToggleOneSelected(row.id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={
                          row.avatars && row.avatars.length
                            ? row.avatars[0].publicUrl
                            : undefined
                        }
                        alt="avatar"
                      />
                    </TableCell>
                    <TableCell>
                      {fields.email.forView(
                        row[fields.email.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {fields.fullName.forView(
                        row[fields.fullName.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {row.roles.map((roleId) => (
                        <div key={roleId}>
                          <span>
                            {Roles.labelOf(roleId)}
                          </span>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <ColoredChip
                        color={
                          row[fields.disabledAsStatus.name]
                            ? 'red'
                            : 'green'
                        }
                        label={fields.disabledAsStatus.forView(
                          row[fields.disabledAsStatus.name],
                        )}
                      ></ColoredChip>
                    </TableCell>
                    <TableCell>
                      {fields.createdAt.forView(
                        row[fields.createdAt.name],
                      )}
                    </TableCell>
                    <TableCell>
                      <Box display="flex">
                        <Tooltip
                          title={i18n('common.view')}
                        >
                          <IconButton
                            component={Link}
                            color="primary"
                            to={`/iam/${row.id}`}
                          >
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>
                        {this.props.hasPermissionToEdit && (
                          <Tooltip
                            title={i18n('common.edit')}
                          >
                            <IconButton
                              color="primary"
                              component={Link}
                              to={`/iam/${row.id}/edit`}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
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
    selectedKeys: selectors.selectSelectedKeys(state),
    hasRows: selectors.selectHasRows(state),
    sorter: selectors.selectSorter(state),
    isAllSelected: selectors.selectIsAllSelected(state),
    hasPermissionToEdit: iamSelectors.selectPermissionToEdit(
      state,
    ),
  };
}

export default connect(select)(IamTable);
