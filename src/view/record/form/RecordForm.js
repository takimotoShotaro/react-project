import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/record/recordModel';
import React, { Component } from 'react';
import FormSchema from 'view/shared/form/formSchema';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  FormButtons,
} from 'view/shared/styles/FormWrapper';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import DatePickerFormItem from 'view/shared/form/items/DatePickerFormItem';
import StaffAutocompleteFormItem from 'view/staff/autocomplete/StaffAutocompleteFormItem';

const { fields } = model;

class RecordForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.staff,
    fields.startDateTime,
    fields.endDateTime,
    fields.unitPrice,
    fields.note,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || {});
  };

  renderForm() {
    const { saveLoading, isEditing, modal } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                {isEditing && (
                  <div style={{display: 'none'}}>
                    <ViewFormItem
                      name={fields.id.name}
                      label={fields.id.label}
                    />
                  </div>
                )}

                <StaffAutocompleteFormItem
                  name={fields.staff.name}
                  label={fields.staff.label}
                  required={fields.staff.required}
                  showCreate={!this.props.modal}
                  form={form}
                />
                <DatePickerFormItem
                  name={fields.startDateTime.name}
                  label={fields.startDateTime.label}
                  required={fields.startDateTime.required}
                  showTime
                />
                <DatePickerFormItem
                  name={fields.endDateTime.name}
                  label={fields.endDateTime.label}
                  required={fields.endDateTime.required}
                  showTime
                />
                <InputFormItem
                  name={fields.unitPrice.name}
                  label={fields.unitPrice.label}
                  required={fields.unitPrice.required}
                />
                <InputFormItem
                  name={fields.note.name}
                  label={fields.note.label}
                  required={fields.note.required}
                />

                <FormButtons
                  style={{
                    flexDirection: modal
                      ? 'row-reverse'
                      : undefined,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                    startIcon={<SaveIcon />}
                  >
                    {i18n('common.save')}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    type="button"
                    startIcon={<UndoIcon />}
                  >
                    {i18n('common.reset')}
                  </Button>

                  {this.props.onCancel ? (
                    <Button
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                      type="button"
                      startIcon={<CloseIcon />}
                    >
                      {i18n('common.cancel')}
                    </Button>
                  ) : null}
                </FormButtons>
              </form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (isEditing && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

export default RecordForm;
