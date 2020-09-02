import AWS from 'aws-sdk'


const talkPolly = (text) => {
    AWS.config.accessKeyId = 'AKIAJRSUK6E62EUILJZA';
    AWS.config.secretAccessKey = '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';
    AWS.config.region = 'us-east-2';

    let polly = new AWS.Polly();
    let params = {
        OutputFormat: "mp3",
        Text: text,
        TextType: "text",
        VoiceId: "Joanna"
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