import React from 'react';
import {i18n} from 'i18n';
import Button from "@material-ui/core/Button";
import History from "@material-ui/icons/History";
import Undo from "@material-ui/icons/Undo";
import Cancel from "@material-ui/icons/Cancel";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import CardActionArea from "@material-ui/core/CardActionArea";

export function StartButton({onClick}) {
  return (
    <Button type="button"
            variant="contained"
            color="primary"
            onClick={onClick}
            startIcon={<History/>}>
      {i18n('attendance.start')}
    </Button>
  );
}

export function EndButton({onClick}) {
  return (
    <Button style={{marginBottom: 24, marginRight: 16}}
            type="button"
            variant="contained"
            color="primary"
            onClick={onClick}
            startIcon={<Cancel/>}>
      {i18n('attendance.end')}
    </Button>
  );
}

export function UndoButton({onClick, disabled}) {
  return (
    <Button style={{marginBottom: 24, marginRight: 24}}
            type="button"
            variant="contained"
            color="primary"
            onClick={onClick}
            startIcon={<Undo/>}
            disabled={disabled}>
      {i18n('attendance.undo')}
    </Button>
  );
}

export function StaffTable({staffs, onRowClick}) {
  return (
    <div style={{height: '90vh', overflowY: 'auto', overflowX: 'hidden'}}>
      <Grid container spacing={4}>
        {staffs && staffs.map(staff => (
          <Grid item lg={2} md={3} sm={4} xs={6}>
            <Card style={staff.endDateTime && {backgroundColor: 'gainsboro'}}>
              <CardActionArea onClick={staff.endDateTime ? function () {} : () => onRowClick(staff)}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={staff.photo && staff.photo.length ?
                        staff.photo[0].publicUrl : "/images/userImages/" + staff.id.charAt(0) + '.jpg'}
                      alt="avatar"
                    />
                  }
                  title={staff.name}
                />
                <Divider variant={'middle'}/>
                <CardContent>
                  <List disablePadding>
                    <ListItem>
                      <ListItemText
                        primary={'入室'}
                        secondary={staff.startDateTime ? moment(staff.startDateTime).format('MM/DD HH:mm') : i18n('attendance.noRecord')}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={'退室'}
                        secondary={staff.endDateTime ? moment(staff.endDateTime).format('MM/DD HH:mm') : i18n('attendance.noRecord')}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
