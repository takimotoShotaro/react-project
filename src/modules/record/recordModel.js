import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';

function label(name) {
  return i18n(`entities.record.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  user: new RelationToOneField('user', label('user'), {
    "required": true
  }),
  staff: new RelationToOneField('staff', label('staff'), {
    "required": true
  }),
  startDateTime: new DateTimeField('startDateTime', label('startDateTime'), {
    "required": true
  }),
  endDateTime: new DateTimeField('endDateTime', label('endDateTime'), {}),
  unitPrice: new StringField('unitPrice', label('unitPrice'), {}),
  note: new StringField('note', label('note'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  startDateTimeRange: new DateTimeRangeField(
    'startDateTimeRange',
    label('startDateTimeRange'),
  ),
  endDateTimeRange: new DateTimeRangeField(
    'endDateTimeRange',
    label('endDateTimeRange'),
  ),
};

export default {
  fields,
};
