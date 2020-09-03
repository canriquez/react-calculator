import AWS from 'aws-sdk'


const TalkPolly = () => {
    let speakQueue = [];
    let isTalking = false;

    const pollyEnq = (obj) => {
        const { conf, text } = obj
        speakQueue.push({ conf, text })
        console.log(speakQueue);
    };

    const talkPolly = (conf, text) => {
        AWS.config.accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
        AWS.config.secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
        AWS.config.region = 'us-east-2';

        console.log(conf, text);

        let polly = new AWS.Polly();
        let params = {
            OutputFormat: "mp3",
            Text: "<speak><prosody rate='120%'>" + text + "</prosody></speak>",
            TextType: "ssml",
            VoiceId: conf.lang
        }

        polly.synthesizeSpeech(params, function (err, data) {
            if (err) {
                //an error ocurred
                console.log(err, err.stack);
            } else {
                let uInt8Array = new Uint8Array(data.AudioStream);
                let arrayBuffer = uInt8Array.buffer;
                let blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });

                let audio = document.getElementById('polly');
                let url = URL.createObjectURL(blob);
                /* audio[0].src = url;
                audio[0].play(); */
                audio.setAttribute('src', url);
                audio.play();
            }
        });
    };

    const pollyTalkNow = () => {
        if (isTalking) { return }
        if (speakQueue.length === 0) { return }

        isTalking = true;
        while (speakQueue.length > 0) {
            let speak = speakQueue.shift();
            if (!isTalking) {
                talkPolly(speak.conf, speak.text)
                isTalking = true;
            };
            // eslint-disable-next-line
            document.getElementById("polly").onended = () => { isTalking = false };
        }

    };
    return { pollyEnq, pollyTalkNow }
};

export default TalkPolly;