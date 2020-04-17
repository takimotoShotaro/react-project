import { ConnectedRouter } from 'connected-react-router';
import { configureStore, getHistory } from 'modules/store';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RoutesComponent from 'view/shared/routes/RoutesComponent';
import 'typeface-roboto';
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { SnackbarProvider, withSnackbar } from 'notistack';
import Message from 'view/shared/message';
import settingsThemeConverter from 'modules/settings/settingsThemeConverter';

const store = configureStore();

class AppCore extends Component {
  componentDidMount() {
    // this is a little hack to not have to import notistack
    // on all the components that emit messages
    Message.registerNotistakEnqueueSnackbar(
      this.props.enqueueSnackbar,
    );
  }

  render() {
    const { settings } = this.props;

    const colors = settingsThemeConverter.fromString(
      settings.theme,
    );

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: colors.primary,
        },
        secondary: {
          main: colors.secondary,
        },
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <Provider store={store}>
            <ConnectedRouter history={getHistory()}>
              <RoutesComponent />
            </ConnectedRouter>
          </Provider>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default class App extends Component {
  render() {
    const AppWithSnackbar = withSnackbar(AppCore);

    return (
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <AppWithSnackbar {...this.props} />
      </SnackbarProvider>
    );
  }
}
