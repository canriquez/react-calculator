import AWS from 'aws-sdk'


const talkPolly = (conf, text) => {
    AWS.config.accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
    AWS.config.secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
    AWS.config.region = 'us-east-2';

    console.log(conf, text);

    let polly = new AWS.Polly();
    let params = {
        OutputFormat: "mp3",
        Text: text,
        TextType: "text",
        VoiceId: conf.lang
    }

    polly.synthesizeSpeech(params, function (err, data) {
        if (err) {
            //an error ocurred
            console.log(err, err.stack);
        } else {
            let uInt8Array = new Uint8Array(data.AudioStream);
            let arrayBuffer = uInt8Array.buffer;
            let blob = new Blob([arrayBuffer]);

            let audio = document.getElementById('polly');
            let url = URL.createObjectURL(blob);
            /* audio[0].src = url;
            audio[0].play(); */
            audio.setAttribute('src', url);
            audio.play();
        }
    });
}

export default talkPolly;