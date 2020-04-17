import actions from 'modules/auth/authActions';
import selectors from 'modules/auth/authSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from 'view/auth/styles/Content';
import EmailUnverifiedPageWrapper from 'view/auth/styles/EmailUnverifiedPageWrapper';
import Logo from 'view/auth/styles/Logo';
import OtherActions from 'view/auth/styles/OtherActions';
import { i18n, i18nHtml } from 'i18n';
import MaterialLink from '@material-ui/core/Link';
import { Button } from '@material-ui/core';

class EmailUnverifiedPage extends Component {
  doSignout = () => {
    const { dispatch } = this.props;
    dispatch(actions.doSignout());
  };

  doSubmit = () => {
    const { dispatch } = this.props;
    dispatch(actions.doSendEmailConfirmation());
  };

  render() {
    return (
      <EmailUnverifiedPageWrapper>
        <Content>
          <Logo>
            <h1>{i18n('app.title')}</h1>
          </Logo>

          <h3 style={{ textAlign: 'center' }}>
            {i18nHtml(
              'auth.emailUnverified.message',
              this.props.email,
            )}
          </h3>

          <Button
            style={{ marginTop: '24px' }}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            size="large"
            disabled={this.props.loading}
            onClick={this.doSubmit}
          >
            {i18n('auth.emailUnverified.submit')}
          </Button>

          <OtherActions>
            <MaterialLink
              component="button"
              onClick={this.doSignout}
            >
              {i18n('auth.signinWithAnotherAccount')}
            </MaterialLink>
          </OtherActions>
        </Content>
      </EmailUnverifiedPageWrapper>
    );
  }
}

const select = (state) => ({
  email: selectors.selectCurrentUserEmail(state),
  loading: selectors.selectLoadingEmailConfirmation(state),
});

export default connect(select)(EmailUnverifiedPage);
