import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Menu, MenuItem, withStyles,} from '@material-ui/core';
import authSelectors from 'modules/auth/authSelectors';
import {getHistory} from 'modules/store';
import authActions from 'modules/auth/authActions';
import Notifications from '@material-ui/icons/Notifications';
import NotificationsNone from '@material-ui/icons/NotificationsNone';

const styles = (theme) => ({
  button: {
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
  },
  text: {
    margin: theme.spacing(0, 1, 0, 0.5),
    display: 'none',
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  optionText: {
    margin: theme.spacing(0, 0.5, 0, 1),
  },
});

class Notification extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const {classes,} = this.props;

    return (
      <React.Fragment>
        <Button
          className={classes.button}
          onClick={this.handleClick}
        >
          <Notifications/>
          <span className={classes.text}>{"お知らせ"}</span>
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <NotificationsNone/>
            <span className={classes.optionText}>
              {"新着お知らせはありません"}
            </span>
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    userText: authSelectors.selectCurrentUserNameOrEmailPrefix(
      state,
    ),
    userAvatar: authSelectors.selectCurrentUserAvatar(
      state,
    ),
  };
}

export default connect(select)(
  withStyles(styles)(Notification),
);
