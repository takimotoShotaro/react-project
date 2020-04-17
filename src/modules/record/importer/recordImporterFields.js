import model from 'modules/record/recordModel';

const { fields } = model;

export default [
  fields.user,
  fields.staff,
  fields.startDateTime,
  fields.endDateTime,
  fields.unitPrice,
  fields.note,
];
