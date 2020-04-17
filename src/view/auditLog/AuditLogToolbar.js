import React, { Component } from 'react';
import ToolbarWrapper from 'view/shared/styles/ToolbarWrapper';
import { connect } from 'react-redux';
import selectors from 'modules/auditLog/auditLogSelectors';
import actions from 'modules/auditLog/auditLogActions';
import { i18n } from 'i18n';
import { Tooltip, Button } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';

class AuditLogToolbar extends Component {
  doExport = () => {
    const { dispatch } = this.props;
    dispatch(actions.doExport());
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

  render() {
    return (
      <ToolbarWrapper>
        {this.renderExportButton()}
      </ToolbarWrapper>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    hasRows: selectors.selectHasRows(state),
  };
}

export default connect(select)(AuditLogToolbar);
