import React, { Component } from 'react';
import Header from 'view/layout/Header';
import Menu from 'view/layout/Menu';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    color: 'rgba(0, 0, 0, 0.65)',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    fontFamily: `'Roboto', sans-serif`,

    '& h1, h2, h3, h4, h5, h6': {
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100vh',
    overflowX: 'hidden',
  },

  toolbar: theme.mixins.toolbar,
});

class Layout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <Menu url={this.props.match.url} />
        <div className={classes.content}>
          <div className={classes.toolbar}></div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
