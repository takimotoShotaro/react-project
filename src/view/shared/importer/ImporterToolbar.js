import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import ToolbarWrapper from 'view/shared/styles/ToolbarWrapper';
import ConfirmModal from 'view/shared/modals/ConfirmModal';
import { Button, Tooltip } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIcon from '@material-ui/icons/Info';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  class ImporterToolbar extends Component {
    state = {
      resetConfirmVisible: false,
      discardConfirmVisible: false,
    };

    doOpenResetConfirmModal = () => {
      this.setState({
        resetConfirmVisible: true,
      });
    };

    doCloseResetConfirmModal = () => {
      this.setState({ resetConfirmVisible: false });
    };

    doOpenDiscardConfirmModal = () => {
      this.setState({
        discardConfirmVisible: true,
      });
    };

    doCloseDiscardConfirmModal = () => {
      this.setState({ discardConfirmVisible: false });
    };

    doReset = () => {
      this.doCloseDiscardConfirmModal();
      this.doCloseResetConfirmModal();
      const { dispatch } = this.props;
      dispatch(actions.doReset());
    };

    doPause = () => {
      const { dispatch } = this.props;
      dispatch(actions.doPause());
    };

    doImport = () => {
      const { dispatch } = this.props;
      dispatch(actions.doImport());
    };

    doDownloadTemplate = () => {
      const { dispatch } = this.props;
      dispatch(actions.doDownloadTemplate());
    };

    render() {
      const { hasRows, importing, completed } = this.props;

      const showDownloadTemplate = !hasRows;
      const showImport =
        hasRows && !importing && !completed;
      const showDiscard =
        hasRows && !importing && !completed;
      const showNew = !!completed;
      const showPause = hasRows && importing;

      return (
        <ToolbarWrapper>
          {showDownloadTemplate && (
            <React.Fragment>
              <Button
                type="button"
                onClick={this.doDownloadTemplate}
                startIcon={<DescriptionIcon />}
              >
                {i18n('importer.form.downloadTemplate')}
              </Button>

              {templateHelp && (
                <Tooltip
                  style={{ marginLeft: '8px' }}
                  title={templateHelp}
                >
                  <InfoIcon />
                </Tooltip>
              )}
            </React.Fragment>
          )}

          {showImport && (
            <Button
              variant="contained"
              color="primary"
              onClick={this.doImport}
              type="button"
              startIcon={<SaveIcon />}
            >
              {i18n('common.import')}
            </Button>
          )}

          {showPause && (
            <Button
              type="button"
              startIcon={<PauseIcon />}
              onClick={this.doPause}
            >
              {i18n('common.pause')}
            </Button>
          )}

          {showNew && (
            <Button
              type="button"
              startIcon={<AddIcon />}
              onClick={this.doOpenResetConfirmModal}
            >
              {i18n('common.new')}
            </Button>
          )}

          {showDiscard && (
            <Button
              type="button"
              startIcon={<DeleteIcon />}
              onClick={this.doOpenDiscardConfirmModal}
            >
              {i18n('common.discard')}
            </Button>
          )}

          {this.state.discardConfirmVisible && (
            <ConfirmModal
              title={i18n('importer.list.discardConfirm')}
              onConfirm={() => this.doReset()}
              onClose={() =>
                this.doCloseDiscardConfirmModal()
              }
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            />
          )}

          {this.state.resetConfirmVisible && (
            <ConfirmModal
              title={i18n('common.areYouSure')}
              onConfirm={() => this.doReset()}
              onClose={() =>
                this.doCloseResetConfirmModal()
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
      hasRows: selectors.selectHasRows(state),
      importing: selectors.selectImporting(state),
      completed: selectors.selectCompleted(state),
    };
  }

  return connect(select)(ImporterToolbar);
};
