import AWS from 'aws-sdk';

const talkPolly = (conf, text) => {
  AWS.config.accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  AWS.config.secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  AWS.config.region = 'us-east-2';

  const polly = new AWS.Polly();
  const params = {
    OutputFormat: 'mp3',
    Text: `<speak><prosody rate='120%'>${text}</prosody></speak>`,
    TextType: 'ssml',
    VoiceId: conf.lang,
  };

  polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      // an error ocurred
    } else {
      const uInt8Array = new Uint8Array(data.AudioStream);
      const arrayBuffer = uInt8Array.buffer;
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });

      const audio = document.getElementById('polly');
      const url = URL.createObjectURL(blob);
      audio.setAttribute('src', url);
      audio.play();
    }
  });
};

export default talkPolly;
