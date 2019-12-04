import * as tf from '@tensorflow/tfjs';

const PAD_INDEX = 0;  // Index of the padding character.
const OOV_INDEX = 2;  // Index fo the OOV character.

function padSequences(
  sequences, maxLen, padding = 'pre', truncating = 'pre', value = PAD_INDEX) {
  // TODO(cais): This perhaps should be refined and moved into tfjs-preproc.
  return sequences.map(seq => {
    // Perform truncation.
    if (seq.length > maxLen) {
      if (truncating === 'pre') {
        seq.splice(0, seq.length - maxLen);
      } else {
        seq.splice(maxLen, seq.length - maxLen);
      }
    }

    // Perform padding.
    if (seq.length < maxLen) {
      const pad = [];
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value);
      }
      if (padding === 'pre') {
        seq = pad.concat(seq);
      } else {
        seq = seq.concat(pad);
      }
    }

    return seq;
  });
}


const HOSTED_URLS = {
  model:
    'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
  metadata:
    'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
};

const LOCAL_URLS = {
  model: './resources/model.json',
  metadata: './resources/metadata.json'
};

async function loadHostedPretrainedModel(url) {
  try {
    const model = await tf.loadLayersModel(url);
    return model;
  } catch (err) {
    console.error('Loading pretrained model failed.');
  }
}

async function loadHostedMetadata(url) {
  try {
    const metadataJson = await fetch(url);
    const metadata = await metadataJson.json();
    return metadata;
  } catch (err) {
    console.error(err);
  }
}

class SentimentPredictor {
  /**
   * Initializes the Sentiment demo.
   */
  async init(urls) {
    this.urls = urls;
    this.model = await loadHostedPretrainedModel(urls.model);
    await this.loadMetadata();
    return this;
  }

  async loadMetadata() {
    const sentimentMetadata =
      await loadHostedMetadata(this.urls.metadata);
    this.indexFrom = sentimentMetadata['index_from'];
    this.maxLen = sentimentMetadata['max_len'];
    console.log('indexFrom = ' + this.indexFrom);
    console.log('maxLen = ' + this.maxLen);

    this.wordIndex = sentimentMetadata['word_index'];
    this.vocabularySize = sentimentMetadata['vocabulary_size'];
    console.log('vocabularySize = ', this.vocabularySize);
  }

  predict(text) {
    // Convert to lower case and remove all punctuations.
    const inputText =
      text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    // Convert the words to a sequence of word indices.
    const sequence = inputText.map(word => {
      let wordIndex = this.wordIndex[word] + this.indexFrom;
      if (wordIndex > this.vocabularySize) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], this.maxLen);
    const input = tf.tensor2d(paddedSequence, [1, this.maxLen]);

    const beginMs = performance.now();
    const predictOut = this.model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    const endMs = performance.now();

    return { score: score, elapsed: (endMs - beginMs) };
  }
};

async function prepUI() {
  const reviewText = document.getElementById('review-text');
  const predictfn = await setupSentiment();
  reviewText.addEventListener('input', () => doPredict(predictfn));
}

function doPredict(predict) {
  const reviewText = document.getElementById('review-text');
  const result = predict(reviewText.value);
  document.getElementById('status').textContent = `Inference result (0 - negative; 1 - positive): ${result.score.toFixed(6)} (elapsed: ${result.elapsed.toFixed(2)} ms)`
}

export async function setupSentiment() {
  const predictor = await new SentimentPredictor().init(HOSTED_URLS);
  return x => predictor.predict(x);
}

export const predictFn = setupSentiment();