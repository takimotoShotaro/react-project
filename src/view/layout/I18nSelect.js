import React, { Component } from 'react';
import { connect } from 'react-redux';
import selectors from 'modules/layout/layoutSelectors';
import actions from 'modules/layout/layoutActions';
import { getLanguages, getLanguage } from 'i18n';
import {
  Button,
  Menu,
  MenuItem,
  withStyles,
} from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';

const styles = (theme) => ({
  button: {
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
  },
  text: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
});

class I18nSelect extends Component {
  state = {
    anchorEl: null,
  };

  doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
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
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Button
          className={classes.button}
          onClick={this.handleClick}
        >
          <TranslateIcon />
          <span className={classes.text}>
            {getLanguage().label}
          </span>
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {getLanguages().map((language) => (
            <MenuItem
              key={language.id}
              onClick={(event) =>
                this.doChangeLanguage(language.id)
              }
            >
              {language.label}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    language: selectors.selectLanguage(state),
  };
}

export default connect(select)(
  withStyles(styles)(I18nSelect),
);
