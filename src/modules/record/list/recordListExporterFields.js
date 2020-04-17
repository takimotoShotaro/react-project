import model from 'modules/record/recordModel';

const { fields } = model;

export default [
  fields.id,
  fields.staff,
  fields.startDateTime,
  fields.endDateTime,
  fields.unitPrice,
  fields.note,
  fields.createdAt,
  fields.updatedAt
];
