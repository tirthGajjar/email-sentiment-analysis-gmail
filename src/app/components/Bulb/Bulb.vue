<template>
  <div v-bind:class="{ frame: untoched, emotioconFrame: !untoched, appIcon: isAppToolbar }">
    <div class="bulb" v-if="untoched">
      <svg class="bulb__icon" viewBox="0 0 277 408">
        <path
          d="M191.32,378 L84.153,378 C79.097,378 75,382.121 75,387.169 C75,392.233 79.097,396.314 84.153,396.314 L106.328,396.314 C107.238,402.573 112.522,407.393 119.033,407.393 L157.457,407.393 C163.976,407.393 169.276,402.573 170.17,396.314 L191.321,396.314 C196.361,396.314 200.466,392.233 200.466,387.169 C200.465,382.121 196.36,378 191.32,378 Z"
          class="holder"
        />
        <path
          d="M191.32,346 L84.153,346 C79.097,346 75,350.113 75,355.169 C75,360.233 79.097,364.314 84.153,364.314 L191.32,364.314 C196.36,364.314 200.465,360.233 200.465,355.169 C200.465,350.121 196.36,346 191.32,346 Z"
          class="holder"
        />
        <path
          d="M241.923,228.803 L248.06,218.935 C254.555,208.888 276.136,172.74 276.136,138.088 C276.136,61.964 214.18,0 138.056,0 C61.924,0 0,61.964 0,138.088 C0,172.708 21.598,208.855 28.222,219.171 C28.051,218.935 38.009,234.729 38.009,234.729 C55.388,261.952 71.767,287.703 75.636,319.136 C76.465,325.85 82.147,330.89 88.894,330.89 L189.323,330.89 C196.045,330.89 201.752,325.85 202.589,319.169 C206.759,285.28 223.845,257.822 241.923,228.803 Z"
          class="bulb__light"
        />
      </svg>
    </div>
    <EMOTICON-VERYSAD v-else-if="emotion === 'VERY_SAD'" />
    <EMOTICON-SAD v-else-if="emotion === 'SAD'" />
    <EMOTICON-CONFUSED v-else-if="emotion === 'CONFUSED'" />
    <EMOTICON-HAPPY v-else-if="emotion === 'HAPPY'" />
    <EMOTICON-VERYHAPPY v-else-if="emotion === 'VERY_HAPPY'" />
    <input class="emotion-score-trigger" type="text" @input="onEmailContentChange" v-model="message" />
  </div>
</template>

<script>
import EMOTICON_VERYSAD from '../../../images/very_sad.svg';
import EMOTICON_SAD from '../../../images/sad.svg';
import EMOTICON_CONFUSED from '../../../images/confused.svg';
import EMOTICON_HAPPY from '../../../images/happy.svg';
import EMOTICON_VERYHAPPY from '../../../images/very_happy.svg';
import { predictFn } from '../../model/sentiment';

export default {
  props: {
    isAppToolbar: {
      type: Boolean,
      default: false,
    },
  },
  async created() {
    this.test = await predictFn;
    console.log(this.test);
  },
  data() {
    return {
      message: '',
      sentiment_score: 0.5,
      untoched: true,
    };
  },
  components: {
    'EMOTICON-VERYSAD': EMOTICON_VERYSAD,
    'EMOTICON-SAD': EMOTICON_SAD,
    'EMOTICON-CONFUSED': EMOTICON_CONFUSED,
    'EMOTICON-HAPPY': EMOTICON_HAPPY,
    'EMOTICON-VERYHAPPY': EMOTICON_VERYHAPPY,
  },
  methods: {
    async onEmailContentChange() {
      console.log(this.sentiment_score);
      this.sentiment_score = await this.test(this.message).score;
      this.untoched = false;
    },
    test() {},
  },
  computed: {
    score() {
      return this.sentiment_score;
    },
    emotion() {
      console.log(this.sentiment_score);
      const sentiment_score = this.sentiment_score;
      if (sentiment_score <= 0.2) {
        return 'VERY_SAD';
      }
      if (sentiment_score <= 0.4) {
        return 'SAD';
      }
      if (sentiment_score <= 0.55) {
        return 'CONFUSED';
      }
      if (sentiment_score <= 0.8) {
        return 'HAPPY';
      }
      if (sentiment_score <= 1.0) {
        return 'VERY_HAPPY';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Bulb.scss';
</style>
