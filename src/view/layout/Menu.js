import React, { Component, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import authSelectors from 'modules/auth/authSelectors';
import { connect } from 'react-redux';
import PermissionChecker from 'modules/auth/permissionChecker';
import actions from 'modules/layout/layoutActions';
import layoutSelectors from 'modules/layout/layoutSelectors';
import routes from 'view/routes';
import clsx from 'clsx';
import {
  withStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

const drawerWidth = 200;

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  toolbar: theme.mixins.toolbar,
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.toggleMenuOnResize();
    window.addEventListener(
      'resize',
      this.toggleMenuOnResize,
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.toggleMenuOnResize,
    );
  }

  toggleMenuOnResize = () => {
    window.innerWidth < 576
      ? this.hideMenu()
      : this.showMenu();
  };

  get selectedKeys() {
    const url = this.props.url;

    const match = routes.privateRoutes.find((option) => {
      if (option.menu.exact) {
        return url === option.path;
      }

      return (
        url === option.path ||
        url.startsWith(option.path + '/')
      );
    });

    if (match) {
      return [match.path];
    }

    return null;
  }

  hideMenu = () => {
    const { dispatch } = this.props;
    dispatch(actions.doHideMenu());
  };

  showMenu = () => {
    const { dispatch } = this.props;
    dispatch(actions.doShowMenu());
  };

  match = (permission) => {
    const permissionChecker = new PermissionChecker(
      this.props.currentUser,
    );

    return permissionChecker.match(permission);
  };

  render() {
    const { classes } = this.props;

    const CustomRouterLink = forwardRef((props, ref) => (
      <div
        ref={ref}
        style={{
          flexGrow: 1,
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
          {...props}
        />
      </div>
    ));

    if (!this.props.menuVisible) {
      return null;
    }

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}></div>
        <List>
          {routes.privateRoutes
            .filter((privateRoute) => !!privateRoute.menu)
            .filter((privateRoutes) =>
              this.match(privateRoutes.permissionRequired),
            )
            .map((privateRoute) => (
              <CustomRouterLink
                key={privateRoute.path}
                to={privateRoute.path}
              >
                <ListItem button>
                  <ListItemIcon
                    className={clsx({
                      [classes.active]: this.selectedKeys.includes(
                        privateRoute.path,
                      ),
                    })}
                  >
                    {privateRoute.icon}
                  </ListItemIcon>
                  <ListItemText
                    className={clsx({
                      [classes.active]: this.selectedKeys.includes(
                        privateRoute.path,
                      ),
                    })}
                  >
                    {privateRoute.label}
                  </ListItemText>
                </ListItem>
              </CustomRouterLink>
            ))}
        </List>
      </Drawer>
    );
  }
}

const select = (state) => ({
  currentUser: authSelectors.selectCurrentUser(state),
  menuVisible: layoutSelectors.selectMenuVisible(state),
});

export default connect(select)(withStyles(styles)(Menu));
