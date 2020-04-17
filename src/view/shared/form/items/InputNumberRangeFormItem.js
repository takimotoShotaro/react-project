import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';
import { TextField } from '@material-ui/core';
import { i18n } from 'i18n';

class InputNumberRangeFormItemNotFast extends Component {
  handleStartChanged = (value) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);
    form.setFieldValue(name, [value, this.endValue()]);
  };

  handleEndChanged = (value) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);
    form.setFieldValue(name, [this.startValue(), value]);
  };

  value = () => {
    const { form, name } = this.props;
    return form.values[name];
  };

  startValue = () => {
    if (!this.value()) {
      return '';
    }

    if (Array.isArray(!this.value())) {
      return '';
    }

    if (!this.value().length) {
      return '';
    }

    return this.value()[0];
  };

  endValue = () => {
    if (!this.value()) {
      return '';
    }

    if (Array.isArray(!this.value())) {
      return '';
    }

    if (this.value().length < 2) {
      return '';
    }

    return this.value()[1];
  };

  render() {
    const {
      label,
      name,
      form,
      hint,
      placeholder,
      autoFocus,
      autoComplete,
      inputProps,
      errorMessage,
      required,
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'baseline',
        }}
      >
        <TextField
          fullWidth
          label={`${label} ${i18n('common.start')}`}
          variant="outlined"
          margin="normal"
          type="number"
          id={`${name}Start`}
          onChange={(event) =>
            this.handleStartChanged(event.target.value)
          }
          value={this.startValue()}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          InputLabelProps={{
            shrink: true,
          }}
          error={
            !!FormErrors.displayableError(
              form,
              name,
              errorMessage,
            )
          }
          helperText={
            FormErrors.displayableError(
              form,
              name,
              errorMessage,
            ) || hint
          }
          {...inputProps}
        />

        <div
          style={{
            flexShrink: 1,
            marginLeft: '8px',
            marginRight: '8px',
          }}
        >
          ~
        </div>

        <TextField
          type="number"
          label={`${label} ${i18n('common.end')}`}
          id={`${name}End`}
          required={required}
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={(event) =>
            this.handleEndChanged(event.target.value)
          }
          value={this.endValue()}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          InputLabelProps={{
            shrink: true,
          }}
          error={
            !!FormErrors.displayableError(
              form,
              name,
              errorMessage,
            )
          }
          {...inputProps}
        />
      </div>
    );
  }
}

InputNumberRangeFormItemNotFast.defaultProps = {
  required: false,
};

InputNumberRangeFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class InputNumberRangeFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <InputNumberRangeFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default InputNumberRangeFormItem;
