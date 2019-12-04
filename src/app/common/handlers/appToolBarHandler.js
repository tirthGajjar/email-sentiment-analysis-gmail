// Vue
import Vue from 'vue';
import store from '../../../store';
import router from '../../router';

// Components
import Bulb from '../../components/Bulb/Bulb';

export async function handleAppToolBar(sdk) {
  sdk.Toolbars.addToolbarButtonForApp({
    title: 'Test',
    iconUrl: 'https://www.inboxsdk.com/images/logo-orange.png',
    iconClass: 'dashboard-button',
    onClick: event => {
      console.log(event);
    },
  });

  while (!document.querySelector('.inboxsdk__appButton')) {
    await new Promise(r => setTimeout(r, 500));
  }

  new Vue({
    el: '.inboxsdk__appButton',
    store,
    router,

    render: h => h(Bulb, { props: { isAppToolbar: true } }),
  });
}
