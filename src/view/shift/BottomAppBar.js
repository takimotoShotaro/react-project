import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "@material-ui/core/Button";
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Delete from '@material-ui/icons/Delete';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Break, BreakTime, WorkTime} from "./Common";
import CardHeader from "@material-ui/core/CardHeader";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Save from "@material-ui/icons/Save";
import Lock from "@material-ui/icons/Lock";

export function ShiftToolbar(props) {

  const {
    shiftTable,
    shiftSelected,
    onNewClick,
    onDeleteClick,
    onFixClick,
    onBreakClick,
    onShiftClick,
  } = props;

  const style = (index) => index === shiftSelected ?
    {height: '100%', marginLeft: 12, border: 'solid 2px #2196f3',} : {height: '100%', marginLeft: 12, border: 'solid 2px white',};
  const display = (index) => index === shiftSelected ? '選択中' : '未選択';
  const color = (index) => index === shiftSelected ? 'primary' : 'disabled';

  return (
    <Toolbar style={{display: 'flex', justifyContent: 'flex-end', height: 144, padding: '12px 24px'}}>
      <Card style={{height: '100%', marginLeft: 12}}>
        <CardActionArea style={{height: '100%', width: 122}} onClick={onNewClick}>
          <CardHeader
            style={{paddingRight: 8}}
            avatar={<AddCircleOutline color={"primary"}/>}
            subheader="作成する"
            subheaderTypographyProps={{color: 'primary'}}
          />
        </CardActionArea>
      </Card>
      <Card style={style(-3)}>
        <CardActionArea style={{height: '100%', width: 122}} onClick={onDeleteClick}>
          <CardHeader
            style={{paddingRight: 8}}
            avatar={<Delete color={"error"}/>}
            subheader="削除する"
            subheaderTypographyProps={{color: 'error'}}
          />
        </CardActionArea>
      </Card>
      <Card style={style(-2)}>
        <CardActionArea style={{height: '100%', width: 122}} onClick={onFixClick}>
          <CardHeader
            style={{paddingRight: 8}}
            avatar={<Lock/>}
            subheader="確定する"
          />
        </CardActionArea>
      </Card>
      <Card style={style(-1)}>
        <CardActionArea style={{height: '100%', width: 122}} onClick={onBreakClick}>
          <CardHeader style={{paddingBottom: 0}} title={display(-1)} avatar={<CheckCircle color={color(-1)}/>}/>
          <CardContent><Break fixed={true}/></CardContent>
          <div style={{height: '100%'}}/>
        </CardActionArea>
      </Card>
      {shiftTable.map((shift, index) =>
        <Card style={style(index)} key={index}>
          <CardActionArea onClick={() => onShiftClick(index)}>
            <CardHeader style={{paddingBottom: 0}} title={display(index)} avatar={<CheckCircle color={color(index)}/>}/>
            <CardContent>
              {shift.workFrom && <WorkTime from={shift.workFrom} to={shift.workTo} fixed={true}/>}
              {shift.breakFrom && <BreakTime from={shift.breakFrom} to={shift.breakTo} fixed={true}/>}
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </Toolbar>
  );
}

export function ButtonToolbar(props) {

  const {
    onPrintClick,
    onSaveClick,
    onEditClick
  } = props;

  return (
      <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
        {/*<Button color={"primary"} style={{marginRight: 24}} onClick={onPrintClick}>*/}
        {/*  印刷する*/}
        {/*</Button>*/}
        <Button startIcon={<Save/>} color={"primary"} variant={"contained"} onClick={onSaveClick}>
          保存する
        </Button>
      </Toolbar>
  );
}