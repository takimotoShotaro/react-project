import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function StaffAvatar(props) {

  const {staff} = props;

  return (
    <Avatar
      src={staff && staff.photo && staff.photo.length ?
        staff.photo[0].publicUrl : "/images/userImages/" + staff.id.charAt(0) + '.jpg'}
      alt="avatar"
    />
  );
}
