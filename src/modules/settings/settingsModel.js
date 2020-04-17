import { i18n } from 'i18n';
import SettingsThemeField from 'modules/settings/settingsThemeField';

function label(name) {
  return i18n(`settings.fields.${name}`);
}

const fields = {
  theme: new SettingsThemeField('theme', label('theme'), {
    required: true,
  }),
};

export default {
  fields,
};
