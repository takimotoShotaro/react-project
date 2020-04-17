import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

class ConfirmModal extends Component {
  onConfirm = () => {
    return this.props.onConfirm();
  };

  onClose = () => {
    return this.props.onClose();
  };

  render() {
    return ReactDOM.createPortal(
      <Dialog
        open={true}
        onClose={this.onClose}
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogActions>
          <Button onClick={this.onClose} color="primary">
            {this.props.cancelText}
          </Button>
          <Button
            onClick={this.onConfirm}
            color="primary"
            autoFocus
          >
            {this.props.okText}
          </Button>
        </DialogActions>
      </Dialog>,
      document.getElementById('modal-root'),
    );
  }
}

export default ConfirmModal;
