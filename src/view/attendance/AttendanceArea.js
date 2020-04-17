import React, {Component} from 'react';
import {connect} from 'react-redux';
import selectors from "../../modules/staff/list/staffListSelectors";
import {EndButton, StaffTable, StartButton, UndoButton} from "./Components";
import actions from 'modules/staff/list/staffListActions';
import FormFilterSchema from "../shared/form/formFilterSchema";
import model from 'modules/staff/staffModel';
import withRouter from "react-router/withRouter";
import AttendanceService from "./AttendanceService";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Edit from '@material-ui/icons/Edit';
import Typography from "../lp/modules/components/Typography";
import ListItemText from "@material-ui/core/ListItemText";

const {fields} = model;

const schema = new FormFilterSchema([
  fields.name,
  fields.note,
]);

class AttendanceArea extends Component {

  constructor(props) {
    super(props);
    this.fullScreenArea = null;
    this.state = {
      fullScreen: false,
      staffSelected: null,
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.doFetchNoLimit(this.initialFilter()));
  }

  initialFilter = () => {
    return schema.initialValues(
      this.props.filter,
      this.props.location,
    );
  };

  startRecording = () => {
    if (this.fullScreenArea.webkitRequestFullscreen) {
      this.fullScreenArea.webkitRequestFullscreen();
    }
    //FF10+
    else if (this.fullScreenArea.mozRequestFullScreen) {
      this.fullScreenArea.mozRequestFullScreen();
    }
    //IE11+
    else if (this.fullScreenArea.msRequestFullscreen) {
      this.fullScreenArea.msRequestFullscreen();
    }
    // HTML5 Fullscreen API仕様
    else if (this.fullScreenArea.requestFullscreen) {
      this.fullScreenArea.requestFullscreen();
    }
    // 未対応
    else {
      alert('ご利用のブラウザはフルスクリーン操作に対応していません');
    }
    this.setState({fullScreen: true})
  };

  endRecording = () => {
    this.setState({fullScreen: false});
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScree) {
      document.mozCancelFullScreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  undo = () => {
    this.setState({staffSelected: null});
    AttendanceService.undo({id: this.state.staffSelected}).then(response =>
      this.props.dispatch(actions.doFetchNoLimit(this.initialFilter()))
    );
  };

  onRowClick = (row) => {
    this.setState({staffSelected: row.id});
    AttendanceService.create({id: row.id}).then(response =>
      this.props.dispatch(actions.doFetchNoLimit(this.initialFilter()))
    );
  };

  render() {
    const {fullScreen, staffSelected} = this.state;
    const {staffs} = this.props;

    return (
      <React.Fragment>
        <Card  style={{width: 'fit-content'}}>
          <CardActionArea onClick={() => this.startRecording()}>
            <CardContent>
              <ListItem>
                <ListItemIcon>
                  <Edit style={{fontSize: 48}} color={"primary"}/>
                </ListItemIcon>
                <ListItemText>
                  <Typography style={{fontSize: 32}} color={"primary"}>{"記録を開始する"}</Typography>
                </ListItemText>
              </ListItem>
            </CardContent>
          </CardActionArea>
        </Card>

        <div
          ref={element => this.fullScreenArea = element}
          style={{
            padding: 24,
            backgroundColor: fullScreen ? 'ghostwhite' : 'white',
            display: fullScreen ? '' : 'none'
          }}
        >

          <EndButton onClick={this.endRecording}/>
          <UndoButton onClick={this.undo} disabled={staffSelected === null}/>
          <StaffTable staffs={staffs} onRowClick={this.onRowClick}/>

        </div>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    staffs: selectors.selectRows(state),
    filter: selectors.selectFilter(state),
  };
}

export default withRouter(connect(select)(AttendanceArea));
