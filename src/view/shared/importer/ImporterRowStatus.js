import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'i18n';
import statuses from 'modules/shared/importer/importerStatuses';
import ImporterErrorStatusMessage from 'view/shared/importer/styles/ImporterErrorStatusMessage';
import ColoredChip from 'view/shared/ColoredChip';

class ImporterRowStatus extends Component {
  render() {
    const { value, errorMessage } = this.props;

    if (value === statuses.PENDING) {
      return (
        <ColoredChip
          label={i18n('importer.pending')}
        ></ColoredChip>
      );
    }

    if (value === statuses.IMPORTED) {
      return (
        <ColoredChip
          color="green"
          label={i18n('importer.imported')}
        ></ColoredChip>
      );
    }

    if (value === statuses.ERROR) {
      return (
        <React.Fragment>
          <ColoredChip
            color="red"
            label={i18n('importer.error')}
          ></ColoredChip>{' '}
          <ImporterErrorStatusMessage>
            {errorMessage}
          </ImporterErrorStatusMessage>
        </React.Fragment>
      );
    }
  }
}

ImporterRowStatus.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default ImporterRowStatus;
