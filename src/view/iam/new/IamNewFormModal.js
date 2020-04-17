import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'i18n';
import IamNewForm from 'view/iam/new/IamNewForm';
import Errors from 'modules/shared/error/errors';
import IamService from 'modules/iam/iamService';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class IamNewFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveLoading: false,
    };
  }

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      await IamService.create(data);
      const { rows } = await IamService.fetchUsers(
        {
          email: data.emails[0],
        },
        null,
        1,
        0,
      );
      this.props.onSuccess(rows[0]);
    } catch (error) {
      Errors.handle(error);
    } finally {
      this.setState({
        saveLoading: false,
      });
    }
  };

  doClose = () => {
    return this.props.onClose();
  };

  render() {
    return ReactDOM.createPortal(
      <Dialog
        open={true}
        onClose={this.doClose}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle
          disableTypography
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ margin: 0 }}>
            {i18n('iam.new.titleModal')}
          </h2>
          <IconButton onClick={this.doClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <IamNewForm
            saveLoading={this.state.saveLoading}
            onSubmit={this.doSubmit}
            onCancel={this.doClose}
            modal
            single
          />
        </DialogContent>
      </Dialog>,
      document.getElementById('modal-root'),
    );
  }
}

export default IamNewFormModal;
