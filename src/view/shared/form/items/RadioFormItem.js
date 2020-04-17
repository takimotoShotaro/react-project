import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';
import {
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

class RadioFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      options,
      errorMessage,
      required,
    } = this.props;

    const formHelperText =
      FormErrors.displayableError(
        form,
        name,
        errorMessage,
      ) || hint;

    return (
      <FormControl
        style={{ marginTop: '16px' }}
        required={required}
        error={
          !!FormErrors.displayableError(
            form,
            name,
            errorMessage,
          )
        }
        component="fieldset"
      >
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          id={name}
          name={name}
          value={form.values[name] || null}
          onChange={(e) => {
            form.setFieldValue(name, e.target.value);
            form.setFieldTouched(name);
          }}
          row
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {formHelperText && (
          <FormHelperText style={{ marginTop: 0 }}>
            {formHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

RadioFormItemNotFast.defaultProps = {
  required: false,
};

RadioFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
};

class RadioFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <RadioFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default RadioFormItem;
