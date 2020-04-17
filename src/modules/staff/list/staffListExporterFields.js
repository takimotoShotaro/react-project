import model from 'modules/staff/staffModel';

const { fields } = model;

export default [
  fields.id,
  fields.photo,
  fields.name,
  fields.unitPrice,
  fields.phoneNumber,
  fields.emailAddress,
  fields.address,
  fields.note,
  fields.createdAt,
  fields.updatedAt
];
