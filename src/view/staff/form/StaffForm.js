import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/staff/staffModel';
import React, { Component } from 'react';
import FormSchema from 'view/shared/form/formSchema';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  FormButtons,
} from 'view/shared/styles/FormWrapper';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';

const { fields } = model;

class StaffForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.photo,
    fields.name,
    fields.unitPrice,
    fields.phoneNumber,
    fields.emailAddress,
    fields.address,
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

                <ImagesFormItem
                  name={fields.photo.name}
                  label={fields.photo.label}
                  required={fields.photo.required}
                  path={fields.photo.path}
                  schema={{
                    size: fields.photo.size,
                  }}
                  max={fields.photo.max}
                />
                <InputFormItem
                  name={fields.name.name}
                  label={fields.name.label}
                  required={fields.name.required}
                />
                <InputFormItem
                  name={fields.unitPrice.name}
                  label={fields.unitPrice.label}
                  required={fields.unitPrice.required}
                />
                <InputFormItem
                  name={fields.phoneNumber.name}
                  label={fields.phoneNumber.label}
                  required={fields.phoneNumber.required}
                />
                <InputFormItem
                  name={fields.emailAddress.name}
                  label={fields.emailAddress.label}
                  required={fields.emailAddress.required}
                />
                <InputFormItem
                  name={fields.address.name}
                  label={fields.address.label}
                  required={fields.address.required}
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

export default StaffForm;
