import { Box } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import { i18n } from 'i18n';
import actions from 'modules/record/list/recordListActions';
import destroyActions from 'modules/record/destroy/recordDestroyActions';
import selectors from 'modules/record/list/recordListSelectors';
import destroySelectors from 'modules/record/destroy/recordDestroySelectors';
import model from 'modules/record/recordModel';
import recordSelectors from 'modules/record/recordSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfirmModal from 'view/shared/modals/ConfirmModal';
import Pagination from 'view/shared/table/Pagination';
import Spinner from 'view/shared/Spinner';
import TableCellCustom from 'view/shared/table/TableCellCustom';
import StaffListItem from 'view/staff/list/StaffListItem';
import Avatar from "@material-ui/core/Avatar";
import StaffAvatar from "../../../modules/jsx/StaffAvatar";

const { fields } = model;

class RecordListTable extends Component {
  state = {
    recordIdToDestroy: null,
  };

  doOpenDestroyConfirmModal = (id) => {
    this.setState({
      recordIdToDestroy: id,
    });
  };

  doCloseDestroyConfirmModal = () => {
    this.setState({ recordIdToDestroy: null });
  };

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

  doDestroy = (id) => {
    this.doCloseDestroyConfirmModal();
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(id));
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
                <TableCellCustom
                  label={'写真'}
                />
                  <TableCellCustom
                    label={fields.staff.label}
                  />
                  <TableCellCustom
                    onSort={this.doChangeSort}
                    hasRows={hasRows}
                    sorter={sorter}
                    name={fields.startDateTime.name}
                    label={fields.startDateTime.label}
                  />
                  <TableCellCustom
                    onSort={this.doChangeSort}
                    hasRows={hasRows}
                    sorter={sorter}
                    name={fields.endDateTime.name}
                    label={fields.endDateTime.label}
                  />
                  <TableCellCustom
                    onSort={this.doChangeSort}
                    hasRows={hasRows}
                    sorter={sorter}
                    name={fields.unitPrice.name}
                    label={fields.unitPrice.label}
                  />
                  <TableCellCustom
                    onSort={this.doChangeSort}
                    hasRows={hasRows}
                    sorter={sorter}
                    name={fields.note.name}
                    label={fields.note.label}
                  />
                <TableCellCustom size="md" />
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
                      <StaffAvatar staff={row.staff}/>
                    </TableCell>
                    <TableCell>
                      <StaffListItem value={row[fields.staff.name]} />
                    </TableCell>
                    <TableCell>
                      {fields.startDateTime.forView(
                        row[fields.startDateTime.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {fields.endDateTime.forView(
                        row[fields.endDateTime.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {fields.unitPrice.forView(
                        row[fields.unitPrice.name],
                      )}
                    </TableCell>
                    <TableCell>
                      {fields.note.forView(
                        row[fields.note.name],
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
                            to={`/record/${row.id}`}
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
                              to={`/record/${row.id}/edit`}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {this.props
                          .hasPermissionToDestroy && (
                          <Tooltip
                            title={i18n('common.destroy')}
                          >
                            <IconButton
                              color="primary"
                              onClick={() =>
                                this.doOpenDestroyConfirmModal(
                                  row.id,
                                )
                              }
                            >
                              <DeleteIcon />
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
          pagination={pagination}
        />

        {this.state.recordIdToDestroy && (
          <ConfirmModal
            title={i18n('common.areYouSure')}
            onConfirm={() =>
              this.doDestroy(this.state.recordIdToDestroy)
            }
            onClose={() =>
              this.doCloseDestroyConfirmModal()
            }
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading:
      selectors.selectLoading(state) ||
      destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasRows: selectors.selectHasRows(state),
    sorter: selectors.selectSorter(state),
    isAllSelected: selectors.selectIsAllSelected(state),
    hasPermissionToEdit: recordSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: recordSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(RecordListTable);
