import model from 'modules/record/recordModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import TextViewItem from 'view/shared/view/TextViewItem';
import UserViewItem from 'view/iam/view/UserViewItem';
import StaffViewItem from 'view/staff/view/StaffViewItem';

const { fields } = model;

class RecordView extends Component {
  renderView() {
    const { isOwner, record } = this.props;

    return (
      <div>
        {isOwner &&
          <>
            <TextViewItem
              label={fields.id.label}
              value={fields.id.forView(record.id)}
            />
            <UserViewItem
              label={fields.user.label}
              value={fields.user.forView(record.user)}
            />
          </>
        }

        <StaffViewItem
          label={fields.staff.label}
          value={fields.staff.forView(record.staff)}
        />

        <TextViewItem
          label={fields.startDateTime.label}
          value={fields.startDateTime.forView(record.startDateTime)}
        />

        <TextViewItem
          label={fields.endDateTime.label}
          value={fields.endDateTime.forView(record.endDateTime)}
        />

        <TextViewItem
          label={fields.unitPrice.label}
          value={fields.unitPrice.forView(record.unitPrice)}
        />

        <TextViewItem
          label={fields.note.label}
          value={fields.note.forView(record.note)}
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
      </div>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default RecordView;
