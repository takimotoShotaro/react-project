import Roles from 'security/roles';
import model from 'modules/auth/userModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import TextViewItem from 'view/shared/view/TextViewItem';
import CustomViewItem from 'view/shared/view/CustomViewItem';
import ImagesViewItem from 'view/shared/view/ImagesViewItem';
import ColoredChip from 'view/shared/ColoredChip';
import { Typography } from '@material-ui/core';

const { fields } = model;

class IamView extends Component {
  renderView() {
    const { user } = this.props;

    return (
      <div>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(user.id)}
        />
        <TextViewItem
          label={fields.authenticationUid.label}
          value={fields.authenticationUid.forView(
            user.authenticationUid,
          )}
        />
        <TextViewItem
          label={fields.email.label}
          value={fields.email.forView(user.email)}
        />
        <TextViewItem
          label={fields.firstName.label}
          value={fields.firstName.forView(user.firstName)}
        />
        <TextViewItem
          label={fields.lastName.label}
          value={fields.lastName.forView(user.lastName)}
        />
        <TextViewItem
          label={fields.phoneNumber.label}
          value={fields.phoneNumber.forView(
            user.phoneNumber,
          )}
          prefix={'+'}
        />

        <ImagesViewItem
          label={fields.avatarsIam.label}
          value={user.avatars}
          type="images"
        />

        <CustomViewItem
          label={fields.disabledAsStatus.label}
          value={user.disabled}
          render={(disabled) => {
            const color = disabled ? 'red' : 'green';
            return (
              <ColoredChip
                color={color}
                label={fields.disabled.forView(disabled)}
              ></ColoredChip>
            );
          }}
        />

        <CustomViewItem
          label={fields.roles.label}
          value={user.roles}
          render={(value) =>
            value.map((roleId) => (
              <div key={roleId}>
                <Typography variant="subtitle1">
                  {Roles.labelOf(roleId)}
                </Typography>
              </div>
            ))
          }
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(user.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(user.updatedAt)}
        />
      </div>
    );
  }

  render() {
    const { user, loading } = this.props;

    if (loading || !user) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default IamView;
