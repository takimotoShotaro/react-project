import React from 'react';
import { Link } from 'react-router-dom';
import ErrorWrapper from 'view/shared/errors/styles/ErrorWrapper';
import { i18n } from 'i18n';
import { Button } from '@material-ui/core';

const Error404Page = () => {
  return (
    <ErrorWrapper>
      <div className="exception">
        <div className="content">
          <h1>404</h1>
          <div className="desc">{i18n('errors.404')}</div>
          <div className="actions">
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              type="button"
            >
              {i18n('errors.backToHome')}
            </Button>
          </div>
        </div>
      </div>
    </ErrorWrapper>
  );
};

export default Error404Page;
