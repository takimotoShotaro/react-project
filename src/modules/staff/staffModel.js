import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import ImagesField from 'modules/shared/fields/imagesField';

function label(name) {
  return i18n(`entities.staff.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  user: new RelationToOneField('user', label('user'), {
    "required": true
  }),
  photo: new ImagesField('photo', label('photo'), 'staff/photo',{}),
  name: new StringField('name', label('name'), {
    "required": true,
    "max": 255
  }),
  unitPrice: new StringField('unitPrice', label('unitPrice'), {
    "max": 255
  }),
  phoneNumber: new StringField('phoneNumber', label('phoneNumber'), {
    "max": 255
  }),
  emailAddress: new StringField('emailAddress', label('emailAddress'), {
    "max": 255
  }),
  address: new StringField('address', label('address'), {
    "max": 255
  }),
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

};

export default {
  fields,
};
