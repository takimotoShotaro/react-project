import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {MuiPickersUtilsProvider, TimePicker,} from '@material-ui/pickers';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import moment from "moment";
import {Break, BreakTime, WorkTime} from "./Common";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DialogContentText from "@material-ui/core/DialogContentText";

export function InputDialog(props) {

  const {
    open,
    workFrom,
    workTo,
    breakFrom,
    breakTo,
    onWorkFromChange,
    onWorkToChange,
    onBreakFromChange,
    onBreakToChange,
    onClose,
    onSubmit,
  } = props;

  const error = () => {
    const workTimeRequire = workFrom && workTo;
    const workTimeValidate = moment(workFrom).isBefore(moment(workTo));
    const breakTimeValidate = (breakFrom && breakTo) && moment(breakFrom).isBefore(moment(breakTo)) || (!breakFrom && !breakTo);
    return !(workTimeRequire && workTimeValidate && breakTimeValidate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>時間を入力する</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              就業時間
              <TimePicker
                color={'primary'}
                style={{width: 56, margin: '0 16px'}}
                clearable
                ampm={false}
                value={workFrom}
                onChange={onWorkFromChange}
              />
              〜
              <TimePicker
                color={'primary'}
                style={{width: 56, margin: '0 16px'}}
                clearable
                ampm={false}
                value={workTo}
                onChange={onWorkToChange}
              />
            </ListItem>
            <ListItem>
              休憩時間
              <TimePicker
                color={'primary'}
                style={{width: 56, margin: '0 16px'}}
                clearable
                ampm={false}
                value={breakFrom}
                onChange={onBreakFromChange}
              />
              〜
              <TimePicker
                color={'primary'}
                style={{width: 56, margin: '0 16px'}}
                clearable
                ampm={false}
                value={breakTo}
                onChange={onBreakToChange}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button color={"primary"} onClick={onClose}>
            キャンセル
          </Button>
          <Button color={"primary"} variant={"contained"} onClick={onSubmit} disabled={error()}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
}

export function ExampleDialog({open, onClose}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>就業時間</TableCell>
              <TableCell><WorkTime from={'10:00'} to={'18:00'} fixed={true}/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>休憩時間</TableCell>
              <TableCell><BreakTime from={'12:00'} to={'13:00'} fixed={true}/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>休み</TableCell>
              <TableCell><Break fixed={true}/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>就業時間（未確定）</TableCell>
              <TableCell><WorkTime from={'10:00'} to={'18:00'} fixed={false}/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>休憩時間（未確定）</TableCell>
              <TableCell><BreakTime from={'12:00'} to={'13:00'} fixed={false}/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>休み（未確定）</TableCell>
              <TableCell><Break fixed={false}/></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button color={"primary"} onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export function SaveDialog({open, onClose, onSubmit}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>シフトを保存します。よろしいですか？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color={"primary"} variant={"contained"} onClick={onSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
