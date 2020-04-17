import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FilesUploader from 'view/shared/uploaders/FilesUploader';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';
import {
  FormControl,
  FormLabel,
  FormHelperText,
} from '@material-ui/core';

class FilesFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      path,
      schema,
      max,
      inputProps,
      required,
    } = this.props;

    const formHelperText =
      FormErrors.displayableError(form, name) || hint;

    return (
      <FormControl
        fullWidth
        style={{ marginTop: '16px', marginBottom: '16px' }}
        required={required}
        error={!!FormErrors.displayableError(form, name)}
        component="fieldset"
      >
        <FormLabel component="legend">{label}</FormLabel>

        <FilesUploader
          path={path}
          schema={schema}
          value={form.values[name]}
          onChange={(value) => {
            form.setFieldValue(name, value);
            form.setFieldTouched(name);
          }}
          max={max}
          {...inputProps}
        />

        {formHelperText && (
          <FormHelperText style={{ marginTop: 0 }}>
            {formHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

FilesFormItemNotFast.defaultProps = {
  max: undefined,
  required: false,
};

FilesFormItemNotFast.propTypes = {
  path: PropTypes.string.isRequired,
  schema: PropTypes.object,

  required: PropTypes.bool,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class FilesFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <FilesFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default FilesFormItem;
