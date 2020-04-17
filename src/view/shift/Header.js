import Grid from "@material-ui/core/Grid";
import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Save from "@material-ui/icons/Save";

export default function Header(props) {

  const {mode, date, onDayClick, onWeekClick, onMonthClick, onDateLeftClick, onDateRightClick, onExampleClick} = props;

  return (
    <Grid container>
      <Grid item container alignItems={"center"} lg={2} md={2} xm={2} xs={2}>
      {/*  <ButtonGroup color="primary">*/}
      {/*    <Button onClick={onDayClick} variant={mode === 'day' && 'contained'}>日</Button>*/}
      {/*    <Button onClick={onWeekClick} variant={mode === 'week' && 'contained'}>週</Button>*/}
      {/*    <Button onClick={onMonthClick} variant={mode === 'month' && 'contained'}>月</Button>*/}
      {/*  </ButtonGroup>*/}
      </Grid>
      <Grid item container justify={'center'} lg={8} md={8} sm={8} xs={8}>
        <Grid item style={{fontSize: "x-large"}}>
          <IconButton color={'primary'} onClick={onDateLeftClick}>
            <ArrowLeft fontSize={'large'}/>
          </IconButton>
          {mode === 'day' && moment(date).format('YYYY年M月D日 (ddd)')}
          {mode === 'week' && moment(date).format('YYYY年M月D日 (ddd)') + ' ~'}
          {mode === 'month' && moment(date).format('YYYY年M月')}
          <IconButton color={'primary'} onClick={onDateRightClick}>
            <ArrowRight fontSize={'large'}/>
          </IconButton>
        </Grid>
      </Grid>
      <Grid item container justify={"flex-end"} alignItems={"center"} lg={2} md={2} sm={2} xs={2}>
        <Grid item>
          <Button color={"primary"} onClick={onExampleClick}>凡例</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
