function encodeAndDecodeMessages() {
    let encode = document.getElementsByTagName('button')[0];
    let decode = document.getElementsByTagName('button')[1];
    let textAreaEncode = document.getElementsByTagName('textarea')[0];
    let textAreaDecode = document.getElementsByTagName('textarea')[1];

    encode.addEventListener('click', encodeFunc);
    decode.addEventListener('click', decodeFunc);

    let message = '';

    function encodeFunc() {
        message = '';

        for (let i = 0; i < textAreaEncode.value.length; i++) {
            message += String.fromCharCode(textAreaEncode.value[i].charCodeAt(0) + 1);
        }

        textAreaDecode.value = message;
        textAreaEncode.value = '';
    }

    function decodeFunc() {
        let decodeMessage = '';

        for (let i = 0; i < message.length; i++) {
            decodeMessage += String.fromCharCode(message[i].charCodeAt(0) - 1);
        }

        textAreaDecode.value = decodeMessage;
    }
}