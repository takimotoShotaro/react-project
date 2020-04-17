import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from 'registerServiceWorker';
import SettingsService from 'modules/settings/settingsService';

(async function() {
  const settings = await SettingsService.initialFetch();

  ReactDOM.render(
    <App settings={settings} />,
    document.getElementById('root'),
  );

  /**
   * It may cause cache issues when developing, so, after your app is ready,
   * change those lines
   */
  unregister();
  // registerServiceWorker();
})();
