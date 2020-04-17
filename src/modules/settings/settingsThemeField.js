import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';
import settingsThemeConverter from 'modules/settings/settingsThemeConverter';

export default class SettingsThemeField extends GenericField {
  constructor(name, label, { required = false } = {}) {
    super(name, label);

    this.required = required;
  }

  forFormInitialValue(value) {
    return settingsThemeConverter.fromString(value);
  }

  forForm() {
    let yupChain = yup
      .string()
      .nullable(true)
      .trim()
      .label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    yupChain = yupChain.transform((_, originalValue) => {
      return settingsThemeConverter.toString(originalValue);
    });

    return yupChain;
  }
}
