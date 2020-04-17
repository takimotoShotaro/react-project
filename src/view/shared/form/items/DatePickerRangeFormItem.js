import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { getLanguage } from 'i18n';
import { i18n } from 'i18n';

class DatePickerRangeFormItemNotFast extends Component {
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
      return null;
    }

    if (Array.isArray(!this.value())) {
      return null;
    }

    if (!this.value().length) {
      return null;
    }

    return this.value()[0] || null;
  };

  endValue = () => {
    if (!this.value()) {
      return null;
    }

    if (Array.isArray(!this.value())) {
      return null;
    }

    if (this.value().length < 2) {
      return null;
    }

    return this.value()[1] || null;
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
      showTime,
    } = this.props;

    const DateTimePickerComponent = showTime
      ? DateTimePicker
      : DatePicker;

    const format = showTime
      ? 'yyyy-MM-dd HH:mm'
      : 'yyyy-MM-dd';

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'baseline',
        }}
      >
        <DateTimePickerComponent
          id={`${name}Start`}
          onChange={(value) =>
            this.handleStartChanged(value)
          }
          value={this.startValue()}
          format={format}
          label={`${label} ${i18n('common.start')}`}
          required={required}
          margin="normal"
          fullWidth
          inputVariant="outlined"
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          error={
            !!FormErrors.displayableError(
              form,
              name,
              errorMessage,
            )
          }
          InputLabelProps={{
            shrink: true,
          }}
          helperText={
            FormErrors.displayableError(
              form,
              name,
              errorMessage,
            ) || hint
          }
          autoOk
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

        <DateTimePickerComponent
          id={`${name}End`}
          onChange={(value) => this.handleEndChanged(value)}
          value={this.endValue()}
          format={format}
          label={`${label} ${i18n('common.end')}`}
          required={required}
          margin="normal"
          fullWidth
          inputVariant="outlined"
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          error={
            !!FormErrors.displayableError(
              form,
              name,
              errorMessage,
            )
          }
          InputLabelProps={{
            shrink: true,
          }}
          helperText={
            FormErrors.displayableError(
              form,
              name,
              errorMessage,
            ) || hint
          }
          autoOk
          {...inputProps}
        />
      </div>
    );
  }
}

DatePickerRangeFormItemNotFast.defaultProps = {
  required: false,
};

DatePickerRangeFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class DatePickerRangeFormItem extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={getLanguage().dateFns}
      >
        <FastField
          name={this.props.name}
          render={({ form }) => (
            <DatePickerRangeFormItemNotFast
              {...this.props}
              form={form}
            />
          )}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default DatePickerRangeFormItem;
