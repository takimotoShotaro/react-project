import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import ImporterStatusWrapper from 'view/shared/importer/styles/ImporterStatusWrapper';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import { LinearProgress } from '@material-ui/core';

export default (selectors) => {
  class ImporterStatus extends Component {
    renderCompleted() {
      return (
        <div style={{ color: green[500] }}>
          {i18n('importer.completed.success')}
        </div>
      );
    }

    renderCompletedSomeErrors() {
      return (
        <div style={{ color: orange[500] }}>
          {i18n('importer.completed.someErrors')}
        </div>
      );
    }

    renderCompletedAllErrors() {
      return (
        <div style={{ color: red[500] }}>
          {i18n('importer.completed.allErrors')}
        </div>
      );
    }

    renderProcessing() {
      return (
        <React.Fragment>
          <LinearProgress
            color="primary"
            variant="determinate"
            value={this.props.percent}
          />
          <p>
            {i18n(
              'importer.importedMessage',
              this.props.nonPendingRowsCount,
              this.props.rowsCount,
            )}{' '}
            {i18n('importer.noNavigateAwayMessage')}
          </p>
        </React.Fragment>
      );
    }

    renderBody() {
      const {
        completed,
        errorRowsCount,
        rowsCount,
      } = this.props;

      const isAllErrors = errorRowsCount === rowsCount;

      if (completed && isAllErrors) {
        return this.renderCompletedAllErrors();
      }

      const isSomeErrors = !!errorRowsCount;

      if (completed && isSomeErrors) {
        return this.renderCompletedSomeErrors();
      }

      const allSuccess = !errorRowsCount;

      if (completed && allSuccess) {
        return this.renderCompleted();
      }

      return this.renderProcessing();
    }

    render() {
      const { importing, completed } = this.props;

      if (!importing && !completed) {
        return null;
      }

      return (
        <ImporterStatusWrapper>
          {this.renderBody()}
        </ImporterStatusWrapper>
      );
    }
  }

  function select(state) {
    return {
      completed: selectors.selectCompleted(state),
      importing: selectors.selectImporting(state),
      nonPendingRowsCount: selectors.selectNonPendingRowsCount(
        state,
      ),
      rowsCount: selectors.selectRowsCount(state),
      percent: selectors.selectPercent(state),
      errorRowsCount: selectors.selectErrorRowsCount(state),
    };
  }

  return connect(select)(ImporterStatus);
};
