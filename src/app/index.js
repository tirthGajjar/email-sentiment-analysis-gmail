// Vue
import Vue from 'vue';

// Constants
import { INBOX_SDK_VERSION, INBOX_SDK_KEY } from './common/constants/appConstants';

// Functions
import { handleComposeViews } from './common/handlers/composeViewHandler';
import { handleAppToolBar } from './common/handlers/appToolBarHandler';

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

InboxSDK.load(INBOX_SDK_VERSION, INBOX_SDK_KEY).then(function(sdk) {
  // the SDK has been loaded, now do something with it!
  handleComposeViews(sdk);
  handleAppToolBar(sdk);
});
