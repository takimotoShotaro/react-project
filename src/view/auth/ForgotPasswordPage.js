import { Formik } from 'formik';
import actions from 'modules/auth/authActions';
import model from 'modules/auth/userModel';
import selectors from 'modules/auth/authSelectors';
import { i18n } from 'i18n';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from 'view/auth/styles/Content';
import ForgotPasswordPageWrapper from 'view/auth/styles/ForgotPasswordPageWrapper';
import Logo from 'view/auth/styles/Logo';
import OtherActions from 'view/auth/styles/OtherActions';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import FormSchema from 'view/shared/form/formSchema';
import { Link } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';
import { Button } from '@material-ui/core';

const { fields } = model;

class ForgotPasswordPage extends Component {
  schema = new FormSchema(null, [fields.email]);

  initialValues = () => {
    return this.schema.initialValues();
  };

  doSubmit = ({ email }) => {
    const { dispatch } = this.props;
    dispatch(actions.doSendPasswordResetEmail(email));
  };

  render() {
    return (
      <ForgotPasswordPageWrapper>
        <Content>
          <Logo>
            <h1>{i18n('app.title')}</h1>
          </Logo>

          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema.schema}
            onSubmit={this.doSubmit}
            render={(form) => (
              <form onSubmit={form.handleSubmit}>
                <InputFormItem
                  name={fields.email.name}
                  label={fields.email.label}
                  autoFocus
                  autoComplete={fields.email.name}
                />

                <Button
                  style={{ marginTop: '16px' }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  size="large"
                  disabled={this.props.loading}
                >
                  {i18n('auth.passwordResetEmail.message')}
                </Button>

                <OtherActions>
                  <MaterialLink
                    component={Link}
                    to="/auth/signin"
                  >
                    {i18n('common.cancel')}
                  </MaterialLink>
                </OtherActions>
              </form>
            )}
          />
        </Content>
      </ForgotPasswordPageWrapper>
    );
  }
}

const select = (state) => ({
  loading: selectors.selectLoadingPasswordResetEmail(state),
});

export default connect(select)(ForgotPasswordPage);
