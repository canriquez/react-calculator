import AWS from 'aws-sdk';

const TalkPolly = () => {
  const speakQueue = [];
  let isTalking = false;

  const pollyEnq = obj => {
    const { conf, text } = obj;
    speakQueue.push({ conf, text });
  };

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
        /* audio[0].src = url;
                audio[0].play(); */
        audio.setAttribute('src', url);
        audio.play();
      }
    });
  };

  const pollyTalkNow = () => {
    if (isTalking) { return; }
    if (speakQueue.length === 0) { return; }

    isTalking = true;
    while (speakQueue.length > 0) {
      const speak = speakQueue.shift();
      if (!isTalking) {
        talkPolly(speak.conf, speak.text);
        isTalking = true;
      }
      // eslint-disable-next-line
      document.getElementById("polly").onended = () => { isTalking = false };
    }
  };
  return { pollyEnq, pollyTalkNow };
};

export default TalkPolly;
