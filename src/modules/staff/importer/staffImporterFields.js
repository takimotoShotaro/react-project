import model from 'modules/staff/staffModel';

const { fields } = model;

export default [
  fields.user,
  fields.photo,
  fields.name,
  fields.unitPrice,
  fields.phoneNumber,
  fields.emailAddress,
  fields.address,
  fields.note,
];
