import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';
import CreatableSelect from 'react-select/creatable';
import { i18n } from 'i18n';
import {
  components as materialUiComponents,
  styles as materialUiStyles,
} from 'view/shared/form/items/shared/reactSelectMaterialUi';
import { withStyles } from '@material-ui/core/styles';

class TagsFormItemNotFast extends Component {
  handleChange = (data) => {
    const { form, name } = this.props;

    form.setFieldTouched(name);

    if (!data || !data.length) {
      form.setFieldValue(name, undefined);
      return;
    }

    const commaSplittedValues = data
      .map((item) => item.value)
      .join(',')
      .split(',');

    form.setFieldValue(name, commaSplittedValues);
  };

  value = () => {
    const { form, name } = this.props;
    const value = form.values[name];

    if (!value || !value.length) {
      return [];
    }

    return value.map((item) => ({
      value: item,
      label: item,
    }));
  };

  render() {
    const {
      label,
      name,
      form,
      hint,
      errorMessage,
      required,
      placeholder,
      isClearable,
      notFoundContent,
      classes,
    } = this.props;

    const isInvalid = !!FormErrors.displayableError(
      form,
      name,
      errorMessage,
    );

    const controlStyles = {
      container: (provided) => ({
        ...provided,
        width: '100%',
        marginTop: '16px',
        marginBottom: '8px',
      }),
      control: (provided) => ({
        ...provided,
        borderColor: isInvalid ? 'red' : undefined,
      }),
    };

    return (
      <CreatableSelect
        value={this.value()}
        classes={classes}
        onChange={this.handleChange}
        inputId={name}
        TextFieldProps={{
          label,
          required,
          variant: 'outlined',
          fullWidth: true,
          error: !!FormErrors.displayableError(
            form,
            name,
            errorMessage,
          ),
          helperText:
            FormErrors.displayableError(
              form,
              name,
              errorMessage,
            ) || hint,
          InputLabelProps: {
            shrink: true,
          },
        }}
        components={materialUiComponents}
        placeholder={placeholder || ''}
        isClearable={isClearable}
        styles={controlStyles}
        isMulti
        formatCreateLabel={(inputValue) => inputValue}
        loadingMessage={() => i18n('autocomplete.loading')}
        noOptionsMessage={() => notFoundContent || ''}
      />
    );
  }
}

TagsFormItemNotFast.defaultProps = {
  required: false,
  isClearable: true,
};

TagsFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
  notFoundContent: PropTypes.string,
};

class TagsFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <TagsFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default withStyles(materialUiStyles)(TagsFormItem);
