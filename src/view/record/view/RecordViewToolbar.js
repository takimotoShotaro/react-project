import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import { connect } from 'react-redux';
import recordSelectors from 'modules/record/recordSelectors';
import destroySelectors from 'modules/record/destroy/recordDestroySelectors';
import destroyActions from 'modules/record/destroy/recordDestroyActions';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import ConfirmModal from 'view/shared/modals/ConfirmModal';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HistoryIcon from '@material-ui/icons/History';
import ToolbarWrapper from 'view/shared/styles/ToolbarWrapper';

class RecordViewToolbar extends Component {
  state = {
    destroyConfirmVisible: false,
  };

  doOpenDestroyConfirmModal = () => {
    this.setState({
      destroyConfirmVisible: true,
    });
  };

  doCloseDestroyConfirmModal = () => {
    this.setState({ destroyConfirmVisible: false });
  };

  id = () => {
    return this.props.match.params.id;
  };

  doDestroy = () => {
    this.doCloseDestroyConfirmModal();
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(this.id()));
  };

  render() {
    const {
      hasPermissionToEdit,
      hasPermissionToAuditLogs,
      hasPermissionToDestroy,
      destroyLoading,
    } = this.props;

    return (
      <ToolbarWrapper>
        {hasPermissionToEdit && (
          <Button
            component={Link}
            to={`/record/${this.id()}/edit`}
            variant="contained"
            color="primary"
            type="button"
            startIcon={<EditIcon />}
          >
            {i18n('common.edit')}
          </Button>
        )}

        {hasPermissionToDestroy && (
          <Button
            variant="contained"
            color="primary"
            type="button"
            startIcon={<DeleteIcon />}
            disabled={destroyLoading}
            onClick={this.doOpenDestroyConfirmModal}
          >
            {i18n('common.destroy')}
          </Button>
        )}

        {hasPermissionToAuditLogs && (
          <Button
            component={Link}
            to={`/audit-logs?entityId=${encodeURIComponent(
              this.id(),
            )}`}
            startIcon={<HistoryIcon />}
          >
            {i18n('auditLog.menu')}
          </Button>
        )}

        {this.state.destroyConfirmVisible && (
          <ConfirmModal
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doDestroy()}
            onClose={() =>
              this.doCloseDestroyConfirmModal()
            }
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}
      </ToolbarWrapper>
    );
  }
}

function select(state) {
  return {
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToEdit: recordSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: recordSelectors.selectPermissionToDestroy(
      state,
    ),
    destroyLoading: destroySelectors.selectLoading(state),
  };
}

export default connect(select)(RecordViewToolbar);
