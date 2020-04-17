import React, { Component } from 'react';
import StaffListFilter from 'view/staff/list/StaffListFilter';
import StaffListTable from 'view/staff/list/StaffListTable';
import StaffListToolbar from 'view/staff/list/StaffListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class StaffListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.staff.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.staff.list.title')}
          </PageTitle>

          <StaffListToolbar />
          <StaffListFilter />
          <StaffListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default StaffListPage;
