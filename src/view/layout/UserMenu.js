import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Menu,
  MenuItem,
  withStyles,
  Avatar,
} from '@material-ui/core';
import authSelectors from 'modules/auth/authSelectors';
import {getHistory} from 'modules/store';
import authActions from 'modules/auth/authActions';
import {i18n} from 'i18n';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

class UserMenu extends Component {
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

  doSignout = () => {
    const {dispatch} = this.props;
    dispatch(authActions.doSignout());
  };

  doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  render() {
    const {classes, userText, userAvatar} = this.props;
    const isTestUser = userText === 'TestUser.Timestamp';

    return (
      isTestUser ?
        <Button
          className={classes.button}
          onClick={this.doSignout}
        >
          <ExitToAppIcon/>
          <span className={classes.text}>{"サインアウト"}</span>
        </Button>

        :

        <React.Fragment>
          <Button
            className={classes.button}
            onClick={this.handleClick}
          >
            {userAvatar && (
              <Avatar src={userAvatar} alt="avatar"/>
            )}
            {!userAvatar && <AccountCircleIcon/>}
            <span className={classes.text}>{userText}</span>
          </Button>
          <Menu
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.doNavigateToProfile}>
              <PersonOutlineIcon/>
              <span className={classes.optionText}>
                {i18n('auth.profile.title')}
              </span>
            </MenuItem>
            <MenuItem onClick={this.doSignout}>
              <ExitToAppIcon/>
              <span className={classes.optionText}>
              {i18n('auth.signout')}
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
  withStyles(styles)(UserMenu),
);
