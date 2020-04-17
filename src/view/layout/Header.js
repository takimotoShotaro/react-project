import layoutActions from 'modules/layout/layoutActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import layoutSelectors from 'modules/layout/layoutSelectors';
import I18nSelect from 'view/layout/I18nSelect';
import {
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserMenu from 'view/layout/UserMenu';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import Notification from "./Notification";

const styles = (theme) => ({
  appBar: {
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    paddingLeft: theme.spacing(1),
    fontWeight: '500',
    fontSize: '1.5em',
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
    textDecoration: 'none',
  },
  grow: {
    flex: '1 1 auto',
  },
});

class Header extends Component {
  doToggleMenu = () => {
    const { dispatch } = this.props;
    dispatch(layoutActions.doToggleMenu());
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={this.doToggleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Link className={classes.logo} to="/">
            {i18n('app.title')}
          </Link>

          <div className={classes.grow} />

          <Notification/>

          {/*<I18nSelect />*/}

          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

const select = (state) => ({
  menuVisible: layoutSelectors.selectMenuVisible(state),
});

export default connect(select)(withStyles(styles)(Header));
