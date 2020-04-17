import React from "react";
import 'moment/locale/ja';
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {Break, BreakTime, WorkTime} from "./Common";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AvatarItem from "../../modules/jsx/AvatarItem";

const useStyles = makeStyles(theme => ({
  time: {
    padding: '4px 8px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'gainsboro',
    }
  },
}));

export default function MainTable(props) {

  const {date, rows, onCellClick} = props;
  const classes = useStyles();

  let dates = [];
  let dateStyles = [];
  const startOfMonthMoment = moment(date).startOf('month');
  const month = startOfMonthMoment.month();
  while (month === startOfMonthMoment.month()) {
    dates = dates.concat([startOfMonthMoment.format('M/D ddd')]);
    const dateStyle = startOfMonthMoment.day() === 0 ?
      {minWidth: 102, color: 'red', paddingRight: 16, whiteSpace: 'nowrap'} :
      startOfMonthMoment.day() === 6 ? {minWidth: 102, color: 'blue', paddingRight: 16, whiteSpace: 'nowrap'}
        : {minWidth: 102, whiteSpace: 'nowrap'};
    dateStyles = dateStyles.concat([dateStyle]);
    startOfMonthMoment.add(1, 'days');
  }

  const styles = {
    nameHeader: {minWidth: 200, zIndex: 2, borderRight: 'solid 1px gainsboro'},
    totalHeader: {paddingRight: 16, minWidth: 62, borderRight: 'solid 1px gainsboro'},
    name: {
      position: 'sticky',
      left: 0,
      padding: 0,
      backgroundColor: 'white',
      borderRight: 'solid 1px gainsboro',
      maxWidth: 200,
    },
  };

  return (
    <div style={{border: 'solid 1px gainsboro', overflowX: 'auto', height: 'calc(100vh - 440px)'}}>
      <Table stickyHeader size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell style={styles.nameHeader}>名前</TableCell>
            <TableCell style={styles.totalHeader} align={"center"}>合計時間</TableCell>
            {dates.map((d, index) => <TableCell key={index} style={dateStyles[index]} align={"center"}>{d}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.staff.name} style={{height: 53}}>
              <TableCell style={styles.name}><AvatarItem staff={row.staff}/></TableCell>
              <TableCell style={{borderRight: 'solid 1px gainsboro', paddingRight: 16}}>{row.total}</TableCell>
              {row.shifts.map((shift, index) =>
                <TableCell key={row.staff.id + index} className={classes.time} onClick={() => onCellClick(row.staff.id, index + 1)}>
                  {shift && shift.workFrom && <WorkTime from={shift.workFrom} to={shift.workTo} fixed={shift.fixed === "1"}/>}
                  {shift && shift.breakFrom && <BreakTime from={shift.breakFrom} to={shift.breakTo} fixed={shift.fixed === "1"}/>}
                  {shift && shift.isBreak === '1' && <Break fixed={shift.fixed === "1"}/>}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
