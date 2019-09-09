// Vue
import Vue from 'vue';
import store from '../../../store';
import router from '../../router';

// Components
import Bulb from '../../components/Bulb/Bulb';

// Helper functions
import { addIconToComposeView } from '../setupCompose';

const composeViewHandler = function(composeView) {
  // a compose view has come into existence, do something with it!
  const stickyBulbNode = addIconToComposeView(composeView);
  new Vue({
    el: stickyBulbNode,
    store,
    router,
    render: h => h(Bulb),
  });
};

export function handleComposeViews(sdk) {
  sdk.Compose.registerComposeViewHandler(composeViewHandler);
}
