import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import StaffView from 'view/staff/view/StaffView';
import { i18n } from 'i18n';
import actions from 'modules/staff/view/staffViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/staff/view/staffViewSelectors';
import StaffViewToolbar from 'view/staff/view/StaffViewToolbar';

class StaffPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.staff.menu'), '/staff'],
            [i18n('entities.staff.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.staff.view.title')}
          </PageTitle>

          <StaffViewToolbar match={this.props.match} />

          <StaffView
            isOwner={this.props.isOwner}
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    isOwner: selectors.selectPermissionToIsOwner(state),
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(StaffPage);
