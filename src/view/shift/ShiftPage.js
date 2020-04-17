import React, {Component} from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Header from "./Header";
import moment from "moment";
import MainTable from "./MainTable";
import {ButtonToolbar, ShiftToolbar} from "./BottomAppBar";
import Divider from "@material-ui/core/Divider";
import shiftActions from "./Actions";
import {ExampleDialog, InputDialog, SaveDialog} from "./Dialogs";
import AppBar from "@material-ui/core/AppBar";
import Message from "../shared/message";

export default class ShiftPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // header
      mode: 'month',
      date: new Date(),
      openExampleDialog: false,

      // finder
      staff: 0,

      // main table
      staffs: [],
      shifts: [],
      staffIdSelected: null,
      daySelected: null,

      // bottombar
      shiftTable: [],
      shiftSelected: null,
      decided: false,
      openSaveDialog: false,

      // inputDialog
      openInputDialog: false,
      workFrom: null,
      workTo: null,
      breakFrom: null,
      breakTo: null,
    }
  }

  componentDidMount() {
    this.doFind();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.date.valueOf() !== prevState.date.valueOf()) {
      this.doFind();
    }
  }

  doFind = () => {
    const {date} = this.state;
    const filter = {date: moment(date).format('YYYY-MM-DD')};
    shiftActions.doFind(filter).then(data => {
      const shiftTable = [];
      data.shifts
        .filter(shift => shift.isBreak !== '1' && shift.workFrom)
        .forEach(shift => {
          if (shiftTable.length > 3) return;
          const isDuplicated = shiftTable.some(shift1 =>
            shift1.workFrom === shift.workFrom && shift1.workTo === shift.workTo &&
            shift1.breakFrom === shift.breakFrom && shift1.breakTo === shift.breakTo);
          if (!isDuplicated) shiftTable.push(shift);
        });
      this.setState({
        shifts: data.shifts,
        staffs: data.staffs,
        shiftTable,
        staffIdSelected: null,
        daySelected: null,
        shiftSelected: null,
      });
    });
  };

  doSave = () => {
    const {mode, date, shifts, staffs} = this.state;
    const requestData = {
      mode,
      date: moment(date).format('YYYY-MM-DD'),
      shifts: shifts.map(shift => {return {...shift, date: moment(shift.date).format('YYYY-MM-DD')}}),
      staffs
    };
    shiftActions.doSave(requestData).then(() => {
      Message.success('保存しました');
      this.setState({openSaveDialog: false});
    });
  };

  onDateLeftClick = () => {
    const {mode, date} = this.state;
    if (mode === 'day') {
      this.setState({date: moment(date).add(-1, 'day')});
    } else if (mode === 'week') {
      this.setState({date: moment(date).add(-1, 'week')});
    } else if (mode === 'month') {
      this.setState({date: moment(date).add(-1, 'month')});
    }
  };

  onDateRightClick = () => {
    const {mode, date} = this.state;
    if (mode === 'day') {
      this.setState({date: moment(date).add(1, 'day')});
    } else if (mode === 'week') {
      this.setState({date: moment(date).add(1, 'week')});
    } else if (mode === 'month') {
      this.setState({date: moment(date).add(1, 'month')});
    }
  };

  onCellClick = (staffId, day) => {
    const {date, shifts, shiftTable, shiftSelected} = this.state;
    const targetYYYYMMDD = moment(date).date(day).format('YYYYMMDD');

    // not selected shift table
    if (shiftSelected === null) {
      this.setState({
        staffIdSelected: staffId,
        daySelected: day,
        openInputDialog: true
      });

    // selected shift table
    } else {
      const targetIndex = shifts.findIndex(shift => shift.staffId === staffId && moment(shift.date).format('YYYYMMDD') === targetYYYYMMDD);

      // fix
      if (shiftSelected === -2) {
        if (targetIndex !== -1) {
          shifts[targetIndex].fixed = "1";
          this.setState({shifts});
        }

      // delete
      } else if (shiftSelected === -3) {
        if (targetIndex !== -1) shifts.splice(targetIndex, 1);
        this.setState({shifts});

      // add
      } else {
        if (targetIndex !== -1) shifts.splice(targetIndex, 1);
        const yyyymmdd = '2016-01-01 ';
        const workTime = shiftSelected < 0 ? 0 :
          moment(yyyymmdd + shiftTable[shiftSelected].workTo).diff(
            moment(yyyymmdd + shiftTable[shiftSelected].workFrom), 'hours', true);
        const breakTime = shiftTable[shiftSelected] && shiftTable[shiftSelected].breakFrom ?
          moment(yyyymmdd + shiftTable[shiftSelected].breakTo).diff(
            moment(yyyymmdd + shiftTable[shiftSelected].breakFrom), 'hours', true) : 0;
        const total = Math.round((workTime - breakTime) * 100) / 100;
        const shift = {
          date: moment(date).date(day).toDate(),
          workFrom: shiftSelected === -1 ? null : shiftTable[shiftSelected].workFrom,
          workTo: shiftSelected === -1 ? null : shiftTable[shiftSelected].workTo,
          breakFrom: shiftSelected === -1 ? null : shiftTable[shiftSelected].breakFrom,
          breakTo: shiftSelected === -1 ? null : shiftTable[shiftSelected].breakTo,
          isBreak: shiftSelected === -1 ? "1" : "0",
          fixed: "0",
          staffId: staffId,
          total
        };
        this.setState({shifts: shifts.concat([shift])});
      }
    }
  };

  createRows = () => {
    const {date, staffs, shifts} = this.state;
    let rows = [];
    let dates = [];
    const startOfMonthMoment = moment(date).startOf('month');
    const month = startOfMonthMoment.month();
    while (month === startOfMonthMoment.month()) {
      dates = dates.concat([startOfMonthMoment.format('YYYYMMDD')]);
      startOfMonthMoment.add(1, 'days');
    }
    staffs.map(staff => {
      const total = shifts
        .filter(shift => shift.staffId === staff.id)
        .map(shift => Number(shift.total))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const rowShifts = dates.map(date1 =>
        shifts
          .filter(shift => shift.staffId === staff.id)
          .find(shift => moment(shift.date).format('YYYYMMDD') === date1)
      );
      const row = {staff, total, shifts: rowShifts};
      rows = rows.concat([row])
    });
    return rows;
  };

  onCloseInputDialog = () => {
    this.setState({
      openInputDialog: false,
      staffIdSelected: null,
      daySelected: null,
    })
  };

  onSubmitInputDialog = () => {
    const {date, shifts, shiftTable, workFrom, workTo, breakFrom, breakTo, staffIdSelected, daySelected} = this.state;
    if (shiftTable.length > 3) shiftTable.pop();
    if (staffIdSelected) {
      const workTime = workFrom ? moment(workTo).diff(moment(workFrom), 'hours', true) : 0;
      const breakTime = breakFrom ? moment(breakTo).diff(moment(breakFrom), 'hours', true) : 0;
      const total = Math.round((workTime - breakTime) * 100) / 100;
      const shift = {
        date: moment(date).date(daySelected).toDate(),
        workFrom: workFrom ? moment(workFrom).format('HH:mm:ss') : null,
        workTo: workTo ? moment(workTo).format('HH:mm:ss') : null,
        breakFrom: breakFrom ? moment(breakFrom).format('HH:mm:ss') : null,
        breakTo: breakTo ? moment(breakTo).format('HH:mm:ss') : null,
        isBreak: "0",
        fixed: "0",
        staffId: staffIdSelected,
        total
      };
      this.setState({
        shifts: shifts.concat([shift]),
        shiftTable: [shift].concat(shiftTable),
        shiftSelected: 0,
        openInputDialog: false,
        staffIdSelected: null,
        daySelected: null
      });
    } else {
      const shift = {
        workFrom: workFrom ? moment(workFrom).format('HH:mm:ss') : null,
        workTo: workTo ? moment(workTo).format('HH:mm:ss') : null,
        breakFrom: breakFrom ? moment(breakFrom).format('HH:mm:ss') : null,
        breakTo: breakTo ? moment(breakTo).format('HH:mm:ss') : null,
      };
      this.setState({
        shiftTable: [shift].concat(shiftTable),
        shiftSelected: 0,
        openInputDialog: false,
      });
    }
  };

  render() {
    const {
      mode, date, shiftTable, shiftSelected, openExampleDialog,
      openInputDialog, openSaveDialog,
      workFrom,
      workTo,
      breakFrom,
      breakTo,
      decided,
    } = this.state;

    const rows = this.createRows();

    return (
      <>
        <ContentWrapper>
          <Header
            date={date}
            mode={mode}
            onDayClick={() => this.setState({mode: 'day'})}
            onWeekClick={() => this.setState({mode: 'week'})}
            onMonthClick={() => this.setState({mode: 'month'})}
            onDateLeftClick={this.onDateLeftClick}
            onDateRightClick={this.onDateRightClick}
            onExampleClick={() => this.setState({openExampleDialog: true})}
          />
          {/*<Divider/>*/}
          {/*<Finder staff={staff} onStaffChange={(event) => this.setState({staff: event.value})}/>*/}
          <MainTable
            date={date}
            rows={rows}
            onCellClick={(staffId, day) => this.onCellClick(staffId, day)}
          />

          <AppBar position="fixed" color={"default"} style={{top: 'auto', bottom: 0,}}>
            {!decided &&
            <>
              <ShiftToolbar
                shiftTable={shiftTable}
                shiftSelected={shiftSelected}
                onNewClick={() => this.setState({openInputDialog: true})}
                onDeleteClick={() => this.setState({shiftSelected: -3})}
                onFixClick={() => this.setState({shiftSelected: -2})}
                onBreakClick={() => this.setState({shiftSelected: -1})}
                onShiftClick={(index) => this.setState({shiftSelected: index})}
              />
              <Divider/>
            </>
            }
            <ButtonToolbar
              decided={decided}
              onPrintClick={() => this.setState({openInputDialog: true})}
              onSaveClick={() => this.setState({openSaveDialog: true})}
              onEditClick={() => this.setState({openInputDialog: true})}
            />
          </AppBar>

          <InputDialog
            open={openInputDialog}
            workFrom={workFrom}
            workTo={workTo}
            breakFrom={breakFrom}
            breakTo={breakTo}
            onWorkFromChange={(date) => this.setState({workFrom: date})}
            onWorkToChange={(date) => this.setState({workTo: date})}
            onBreakFromChange={(date) => this.setState({breakFrom: date})}
            onBreakToChange={(date) => this.setState({breakTo: date})}
            onClose={this.onCloseInputDialog}
            onSubmit={this.onSubmitInputDialog}
          />
          <ExampleDialog
            open={openExampleDialog}
            onClose={() => this.setState({openExampleDialog: false})}
          />
          <SaveDialog
            open={openSaveDialog}
            onClose={() => this.setState({openSaveDialog: false})}
            onSubmit={this.doSave}
          />
        </ContentWrapper>
        <div style={{height: 200}}/>
      </>
    );
  }
}

