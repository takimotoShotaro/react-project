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

export class DatePickerFormItemNotFast extends Component {
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
      <DateTimePickerComponent
        format={format}
        id={name}
        label={label}
        required={required}
        margin="normal"
        fullWidth
        inputVariant="outlined"
        onChange={(value) => {
          form.setFieldValue(name, value);
          form.setFieldTouched(name);
        }}
        value={form.values[name] || null}
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
        autoOk
        {...inputProps}
      />
    );
  }
}

DatePickerFormItemNotFast.defaultProps = {
  required: false,
};

DatePickerFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

class DatePickerFormItem extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={getLanguage().dateFns}
      >
        <FastField
          name={this.props.name}
          render={({ form }) => (
            <DatePickerFormItemNotFast
              {...this.props}
              form={form}
            />
          )}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default DatePickerFormItem;
