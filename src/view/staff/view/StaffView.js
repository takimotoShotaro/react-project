import model from 'modules/staff/staffModel';
import React, {Component} from 'react';
import Spinner from 'view/shared/Spinner';
import TextViewItem from 'view/shared/view/TextViewItem';
import UserViewItem from 'view/iam/view/UserViewItem';
import ImagesViewItem from 'view/shared/view/ImagesViewItem';

const {fields} = model;

class StaffView extends Component {
  renderView() {
    const {record, isOwner} = this.props;

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

        <ImagesViewItem
          label={fields.photo.label}
          value={fields.photo.forView(record.photo)}
        />

        <TextViewItem
          label={fields.name.label}
          value={fields.name.forView(record.name)}
        />

        <TextViewItem
          label={fields.unitPrice.label}
          value={fields.unitPrice.forView(record.unitPrice)}
        />

        <TextViewItem
          label={fields.phoneNumber.label}
          value={fields.phoneNumber.forView(record.phoneNumber)}
        />

        <TextViewItem
          label={fields.emailAddress.label}
          value={fields.emailAddress.forView(record.emailAddress)}
        />

        <TextViewItem
          label={fields.address.label}
          value={fields.address.forView(record.address)}
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
    const {record, loading} = this.props;

    if (loading || !record) {
      return <Spinner/>;
    }

    return this.renderView();
  }
}

export default StaffView;
