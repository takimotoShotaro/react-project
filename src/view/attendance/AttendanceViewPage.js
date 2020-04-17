import React, {Component} from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import {i18n} from 'i18n';
import actions from 'modules/staff/view/staffViewActions';
import {connect} from 'react-redux';
import selectors from 'modules/staff/view/staffViewSelectors';
import AttendanceArea from "./AttendanceArea";
import ContentTitle from "../shared/styles/ContentTitle";
import ContentWrapperInvisible from "../layout/styles/ContentWrapperInvisible";

class AttendanceViewPage extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <ContentTitle title={'記録'}/>
        <ContentWrapperInvisible>
          <AttendanceArea/>
        </ContentWrapperInvisible>
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

export default connect(select)(AttendanceViewPage);
