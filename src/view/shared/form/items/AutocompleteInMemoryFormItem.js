import { FastField } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormErrors from 'view/shared/form/formErrors';
import Select from 'react-select';
import { i18n } from 'i18n';
import {
  components as materialUiComponents,
  styles as materialUiStyles,
} from 'view/shared/form/items/shared/reactSelectMaterialUi';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

class AutocompleteInMemoryFormItemNotFast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullDataSource: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.fetchAllResults();
  }

  value = () => {
    const { mode } = this.props;
    if (mode === 'multiple') {
      return this.valueMultiple();
    } else {
      return this.valueOne();
    }
  };

  valueMultiple = () => {
    const { form, name, mapper } = this.props;

    if (form.values[name]) {
      return form.values[name].map((value) =>
        mapper.toAutocomplete(value),
      );
    }

    return [];
  };

  valueOne = () => {
    const { form, name, mapper } = this.props;

    if (form.values[name]) {
      return mapper.toAutocomplete(form.values[name]);
    }

    return null;
  };

  handleSelect = (value) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);

    const { mode } = this.props;
    if (mode === 'multiple') {
      return this.handleSelectMultiple(value);
    } else {
      return this.handleSelectOne(value);
    }
  };

  handleSelectMultiple = (values) => {
    const { form, name, mapper } = this.props;

    if (!values) {
      form.setFieldValue(name, []);
      return;
    }

    form.setFieldValue(
      name,
      values.map((value) => mapper.toValue(value)),
    );
  };

  handleSelectOne = (value) => {
    const { form, name, mapper } = this.props;

    if (!value) {
      form.setFieldValue(name, '');
      return;
    }

    form.setFieldValue(name, mapper.toValue(value));
  };

  fetchAllResults = async () => {
    this.setState({ loading: true });

    try {
      const { fetchFn, mapper } = this.props;
      let fullDataSource = await fetchFn();
      fullDataSource = fullDataSource.map((data) =>
        mapper.toAutocomplete(data),
      );

      this.setState({ fullDataSource, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ fullDataSource: [], loading: false });

      return [];
    }
  };

  options = () => {
    const { mode } = this.props;
    const { fullDataSource: options } = this.state;

    if (!options) {
      return [];
    }

    // Includes the selected value on the options
    if (this.value()) {
      if (mode === 'multiple') {
        return [...this.value(), ...options];
      } else {
        return [this.value(), ...options];
      }
    }

    return options;
  };

  render() {
    const {
      form,
      label,
      name,
      hint,
      placeholder,
      autoFocus,
      inputProps,
      errorMessage,
      mode,
      required,
      isClearable,
      classes,
    } = this.props;

    const { loading } = this.state;

    const hintOrLoading = loading
      ? i18n('autocomplete.loading')
      : hint;

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
      <div
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Select
          styles={controlStyles}
          classes={classes}
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
              ) || hintOrLoading,
            InputLabelProps: {
              shrink: true,
            },
          }}
          components={materialUiComponents}
          isMulti={mode === 'multiple' ? true : false}
          placeholder={placeholder || ''}
          autoFocus={autoFocus || undefined}
          onChange={this.handleSelect}
          value={this.value()}
          isClearable={isClearable}
          options={this.options()}
          loadingMessage={() =>
            i18n('autocomplete.loading')
          }
          noOptionsMessage={() =>
            i18n('autocomplete.noOptions')
          }
          {...inputProps}
        />

        {this.props.showCreate &&
        this.props.hasPermissionToCreate ? (
          <IconButton
            style={{
              marginLeft: '16px',
              marginTop: '16px',
              marginBottom: '8px',
            }}
            color="secondary"
            onClick={this.props.onOpenModal}
          >
            <AddIcon />
          </IconButton>
        ) : null}
      </div>
    );
  }
}

AutocompleteInMemoryFormItemNotFast.defaultProps = {
  isClearable: true,
  mode: 'default',
  required: false,
};

AutocompleteInMemoryFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  fetchFn: PropTypes.func.isRequired,
  mapper: PropTypes.object.isRequired,
  required: PropTypes.bool,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  inputProps: PropTypes.object,
  showCreate: PropTypes.bool,
  hasPermissionToCreate: PropTypes.bool,
};

class AutocompleteInMemoryFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <AutocompleteInMemoryFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default withStyles(materialUiStyles)(
  AutocompleteInMemoryFormItem,
);
