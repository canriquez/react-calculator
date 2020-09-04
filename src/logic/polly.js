import AWS from 'aws-sdk';

const talkPolly = (conf, text, buttonId) => {
  AWS.config.accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  AWS.config.secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
  AWS.config.region = 'us-east-2';

  const polly = new AWS.Polly();

  const voiceSetup = ['Joanna', 'Mia'];

  const voiceOptions = {
    Joanna: { engine: 'standard', lang: 'Joanna', sr: '22050' },
    Mia: { engine: 'standard', lang: 'Mia', sr: '22050' },
    Kevin: { engine: 'neural', lang: 'Kevin', sr: '24000' },
  };

  const params = {
    Engine: voiceOptions[voiceSetup[conf.lang]].engine,
    OutputFormat: 'mp3',
    Text: `<speak><prosody rate='120%'>${text}</prosody></speak>`,
    TextType: 'ssml',
    SampleRate: voiceOptions[voiceSetup[conf.lang]].sr,
    VoiceId: voiceOptions[voiceSetup[conf.lang]].lang,
  };

  polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      // an error ocurred
      // console.log(err, err.stack);
    } else {
      const uInt8Array = new Uint8Array(data.AudioStream);
      const arrayBuffer = uInt8Array.buffer;
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });

      const audio = document.getElementById(`audio-${buttonId.charCodeAt(0) === 61 ? 'equal' : buttonId}`);
      const url = URL.createObjectURL(blob);
      audio.setAttribute('src', url);
      audio.play();
    }
  });
};

export default talkPolly;
