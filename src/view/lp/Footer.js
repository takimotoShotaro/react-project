import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from './modules/components/Typography';
import Link from "react-router-dom/Link";
import {i18n} from "../../i18n";
import MuiLink from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#f5f8fa',
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: '100%',
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      // backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Typography style={{display: 'flex', flexDirection: 'column', borderTop: 'solid 1px lightgrey'}} component="footer" className={classes.root}>
      <div style={{margin: 'auto', padding: 36}}>
        <Link style={{textDecoration: 'none', color: 'black'}} to="/">{i18n('lp.home')}</Link><br/>
        <MuiLink style={{textDecoration: 'none', color: 'black'}} href="https://qiita.com/takimoto_shotaro">{i18n('lp.blog')}</MuiLink><br/>
        <Link style={{textDecoration: 'none', color: 'black'}} to="/legal">{i18n('lp.legal')}</Link><br/>
        <Link style={{textDecoration: 'none', color: 'black'}} to="/privacy_policy">{i18n('lp.privacyPolicy')}</Link><br/>
      </div>
      <div style={{textAlign: 'center', paddingBottom: 36}}>
        {'Copyright © 2020 timestamp.net'}
      </div>
    </Typography>
  );
}
