import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FastField } from 'formik';
import { TextField } from '@material-ui/core';

class ViewFormItemNotFast extends Component {
  render() {
    const { label, name, form } = this.props;

    return (
      <TextField
        id={name}
        label={label}
        fullWidth
        defaultValue={form.values[name]}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    );
  }
}

ViewFormItemNotFast.defaultProps = {};

ViewFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

class ViewFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <ViewFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default ViewFormItem;
