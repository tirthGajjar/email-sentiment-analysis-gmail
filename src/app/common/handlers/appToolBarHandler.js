// Vue
import Vue from 'vue';
import store from '../../../store';
import router from '../../router';

// Components
import Bulb from '../../components/Bulb/Bulb';

export function handleAppToolBar(sdk) {
  sdk.Toolbars.addToolbarButtonForApp({
    title: 'Test',
    iconUrl: 'https://www.inboxsdk.com/images/logo-orange.png',
    iconClass: 'dashboard-button',
    onClick: event => {
      console.log(event);
    },
  });
  new Vue({
    el: '.inboxsdk__appButton',
    store,
    router,
    render: h => h(Bulb),
  });
}
