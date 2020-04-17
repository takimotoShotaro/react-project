import React, { Component } from 'react';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/list/users/iamListUsersSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import actions from 'modules/iam/list/users/iamListUsersActions';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import { Button, Tooltip } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HistoryIcon from '@material-ui/icons/History';
import ToolbarWrapper from 'view/shared/styles/ToolbarWrapper';

class IamToolbar extends Component {
  doExport = () => {
    const { dispatch } = this.props;
    dispatch(actions.doExport());
  };

  doRemoveAllSelected = () => {
    const { dispatch } = this.props;
    dispatch(actions.doRemoveAllSelected());
  };

  doDisableAllSelected = () => {
    const { dispatch } = this.props;
    dispatch(actions.doDisableAllSelected());
  };

  doEnableAllSelected = () => {
    const { dispatch } = this.props;
    dispatch(actions.doEnableAllSelected());
  };

  renderExportButton() {
    const { hasRows, loading, exportLoading } = this.props;

    const disabledWithTooltip = !hasRows || loading;

    const button = (
      <Button
        type="button"
        disabled={disabledWithTooltip || exportLoading}
        onClick={this.doExport}
        startIcon={<DescriptionIcon />}
      >
        {i18n('common.export')}
      </Button>
    );

    if (!disabledWithTooltip) {
      return button;
    }

    return (
      <React.Fragment>
        <Tooltip title={i18n('common.noDataToExport')}>
          <span>{button}</span>
        </Tooltip>
      </React.Fragment>
    );
  }

  renderRemoveButton() {
    const {
      selectedKeys,
      loading,
      hasPermissionToEdit,
    } = this.props;

    if (!hasPermissionToEdit) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <Button
        variant="contained"
        color="primary"
        type="button"
        disabled={disabled}
        onClick={this.doRemoveAllSelected}
        startIcon={<RemoveIcon />}
      >
        {i18n('common.remove')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  }

  renderEnableButton() {
    const {
      selectedKeys,
      loading,
      hasPermissionToEdit,
    } = this.props;

    if (!hasPermissionToEdit) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <Button
        variant="contained"
        color="primary"
        type="button"
        disabled={disabled}
        onClick={this.doEnableAllSelected}
        startIcon={<DoneIcon />}
      >
        {i18n('iam.enable')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  }

  renderDisableButton() {
    const {
      selectedKeys,
      loading,
      hasPermissionToEdit,
    } = this.props;

    if (!hasPermissionToEdit) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <Button
        variant="contained"
        color="primary"
        type="button"
        disabled={disabled}
        onClick={this.doDisableAllSelected}
        startIcon={<BlockIcon />}
      >
        {i18n('iam.disable')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  }

  render() {
    return (
      <ToolbarWrapper>
        {this.props.hasPermissionToCreate && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/iam/new"
            startIcon={<AddIcon />}
          >
            {i18n('common.new')}
          </Button>
        )}

        {this.props.hasPermissionToImport && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/iam/importer"
            startIcon={<CloudUploadIcon />}
          >
            {i18n('common.import')}
          </Button>
        )}

        {this.renderRemoveButton()}
        {this.renderEnableButton()}
        {this.renderDisableButton()}

        {this.props.hasPermissionToAuditLogs && (
          <Button
            component={Link}
            to="/audit-logs?entityNames=user"
            startIcon={<HistoryIcon />}
          >
            {i18n('auditLog.menu')}
          </Button>
        )}

        {this.renderExportButton()}
      </ToolbarWrapper>
    );
  }
}

function select(state) {
  return {
    selectedKeys: selectors.selectSelectedKeys(state),
    loading: selectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    hasRows: selectors.selectHasRows(state),
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToEdit: iamSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToCreate: iamSelectors.selectPermissionToCreate(
      state,
    ),
    hasPermissionToImport: iamSelectors.selectPermissionToImport(
      state,
    ),
  };
}

export default connect(select)(IamToolbar);
