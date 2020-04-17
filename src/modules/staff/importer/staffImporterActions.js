import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/staff/importer/staffImporterSelectors';
import StaffService from 'modules/staff/staffService';
import fields from 'modules/staff/importer/staffImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'STAFF_IMPORTER',
  selectors,
  StaffService.import,
  fields,
  i18n('entities.staff.importer.fileName'),
);
