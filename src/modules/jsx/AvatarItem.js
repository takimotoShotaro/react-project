import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

export default function AvatarItem(props) {

  const {staff} = props;

  return (
    <List disablePadding dense>
      <ListItem dense>
        <ListItemAvatar>
          <Avatar src={"/images/userImages/" + staff.id.charAt(0) + '.jpg'} alt="avatar"/>
        </ListItemAvatar>
        <ListItemText
          style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
          primary={staff.name}
        />
      </ListItem>
    </List>
  );
}
