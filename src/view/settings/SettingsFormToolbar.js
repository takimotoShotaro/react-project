import { Button } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import { i18n } from 'i18n';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ToolbarWrapper from 'view/shared/styles/ToolbarWrapper';

class SettingsFormToolbar extends Component {
  render() {
    return (
      <ToolbarWrapper>
        {this.props.hasPermissionToAuditLogs && (
          <Button
            component={Link}
            to="/audit-logs?entityNames=settings"
            startIcon={<HistoryIcon />}
          >
            {i18n('auditLog.menu')}
          </Button>
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
  };
}

export default connect(select)(SettingsFormToolbar);
