import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import ToolbarWrapper from 'view/shared/styles/ToolbarWrapper';
import actions from 'modules/iam/view/iamViewActions';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/view/iamViewSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import ConfirmModal from 'view/shared/modals/ConfirmModal';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityIcon from '@material-ui/icons/Visibility';

class IamViewToolbar extends Component {
  state = {
    toggleStatusConfirmVisible: false,
  };

  doOpenToggleStatusConfirmModal = () => {
    this.setState({
      toggleStatusConfirmVisible: true,
    });
  };

  doCloseToggleStatusConfirmModal = () => {
    this.setState({ toggleStatusConfirmVisible: false });
  };

  doToggleStatus = () => {
    this.doCloseToggleStatusConfirmModal();
    const { dispatch } = this.props;
    dispatch(actions.doToggleStatus());
  };

  render() {
    const {
      match,
      user,
      hasPermissionToEdit,
      hasPermissionToAuditLogs,
      loading,
    } = this.props;

    const id = match.params.id;

    return (
      <ToolbarWrapper>
        {hasPermissionToEdit && (
          <Button
            component={Link}
            to={`/iam/${id}/edit`}
            variant="contained"
            color="primary"
            type="button"
            startIcon={<EditIcon />}
          >
            {i18n('common.edit')}
          </Button>
        )}

        {user && hasPermissionToEdit && (
          <Button
            variant="contained"
            color="primary"
            type="button"
            startIcon={
              user.disabled ? <DoneIcon /> : <BlockIcon />
            }
            disabled={loading}
            onClick={this.doOpenToggleStatusConfirmModal}
          >
            {user.disabled
              ? i18n('iam.enable')
              : i18n('iam.disable')}
          </Button>
        )}

        {hasPermissionToAuditLogs && (
          <Button
            component={Link}
            to={`/audit-logs?entityId=${encodeURIComponent(
              id,
            )}`}
            startIcon={<HistoryIcon />}
          >
            {i18n('auditLog.menu')}
          </Button>
        )}

        {user && user.email && hasPermissionToAuditLogs && (
          <Button
            component={Link}
            type="button"
            to={`/audit-logs?createdByEmail=${encodeURIComponent(
              user.email,
            )}`}
            startIcon={<VisibilityIcon />}
          >
            {i18n('iam.view.activity')}
          </Button>
        )}

        {this.state.toggleStatusConfirmVisible && (
          <ConfirmModal
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doToggleStatus()}
            onClose={() =>
              this.doCloseToggleStatusConfirmModal()
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
    loading: selectors.selectLoading(state),
    user: selectors.selectUser(state),
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToEdit: iamSelectors.selectPermissionToEdit(
      state,
    ),
  };
}

export default connect(select)(IamViewToolbar);
