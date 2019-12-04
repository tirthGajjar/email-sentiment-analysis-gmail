// Vue
import Vue from 'vue';
import store from '../../../store';
import router from '../../router';

// Components
import Bulb from '../../components/Bulb/Bulb';

// Helper functions
import { addIconToComposeView } from '../setupCompose';

const composeViewHandler = function (composeView) {
  // a compose view has come into existence, do something with it!
  const composeBox = composeView.getBodyElement().closest('.inboxsdk__compose');
  const stickyBulbNode = addIconToComposeView(composeBox);
  composeView.on('bodyChanged', (e) => {
    const emailText = composeView.getTextContent();
    const emotionScoreTriggerInput = composeBox.querySelector('.emotion-score-trigger');
    emotionScoreTriggerInput.value = emailText;
    var event = document.createEvent('Event');
    event.initEvent('input', true, true);
    emotionScoreTriggerInput.dispatchEvent(event);
  });
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
