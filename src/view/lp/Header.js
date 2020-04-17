import React from 'react';
import {connect} from 'react-redux';
import {AppBar, Toolbar, withStyles,} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {i18n} from 'i18n';
import Button from "@material-ui/core/Button";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

function Header(props) {

  const {classes} = props;
  const isSP = !useMediaQuery('(min-width:600px)');

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>

        {isSP || <div style={{width: 200}}/>}

        <div>
          <Link to="/">
            <img style={{height: isSP ? 24 : 32, marginTop: 4}} src={'/images/logo/logo.png'} alt={''}/>
          </Link>
        </div>

        <div>
          {/*<I18nSelect/>*/}
          <Link style={{textDecoration: 'none'}} to="/auth/signin?testUser=true">
            <Button style={{color: 'white'}} className={classes.button}>
              <SupervisedUserCircle/>
              <span className={classes.text}>試してみる</span>
            </Button>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/auth/signin">
            <Button style={{color: 'white'}} className={classes.button}>
              <AccountCircleIcon/>
              <span className={classes.text}>{i18n('auth.signin')}</span>
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}


export default connect()(withStyles(styles)(Header));
