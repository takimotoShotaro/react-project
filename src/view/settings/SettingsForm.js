import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import actions from 'modules/settings/settingsActions';
import model from 'modules/settings/settingsModel';
import selectors from 'modules/settings/settingsSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormSchema from 'view/shared/form/formSchema';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  FormButtons,
} from 'view/shared/styles/FormWrapper';
import MaterialUIColorTool from 'view/settings/MaterialUIColorTool';

const { fields } = model;

class SettingsForm extends Component {
  state = {
    materialUIColorToolKey: 0,
  };

  schema = new FormSchema(null, [fields.theme]);

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFind());
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    const { id, ...data } = this.schema.cast(values);
    dispatch(actions.doSave(data));
  };

  handleReset = () => {
    // little hack to reset the uncontrolled component
    this.setState((prevState) => ({
      materialUIColorToolKey:
        prevState.materialUIColorToolKey + 1,
    }));
  };

  initialValues = () => {
    const settings = this.props.settings;
    return this.schema.initialValues(settings);
  };

  renderForm() {
    const { saveLoading } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          render={(form) => {
            return (
              <form onSubmit={form.handleSubmit}>
                <MaterialUIColorTool
                  key={this.state.materialUIColorToolKey}
                  onChange={(value) =>
                    form.setFieldValue(
                      fields.theme.name,
                      value,
                    )
                  }
                  defaultValue={
                    form.values[fields.theme.name]
                  }
                />

                <FormButtons>
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
    const { findLoading, settings } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (!settings) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    settings: selectors.selectSettings(state),
  };
}

export default connect(select)(SettingsForm);
