document.addEventListener("DOMContentLoaded", () => {
    const handleTextButton = document.getElementById('handleText');
    const textToEncodeInput = document.getElementById('textToEncode');
    const errorPercentageInput = document.getElementById('errorPercentage');
    const garbledTextOutput = document.getElementById('garbledTextOutput');
    const decodedTextOutput = document.getElementById('decodedTextOutput');

    handleTextButton.addEventListener('click', () => {
        const textToEncode = textToEncodeInput.value;
        if (textToEncode) {
            let binaryArray = textToBinaryArray(textToEncode);
            
            let errorPercentage = parseFloat(errorPercentageInput.value) || 0;

            let [_, binaryArrayWithError] = introduceErrors(binaryArray.slice(), errorPercentage);
            let garbledText = binaryArrayToText(binaryArrayWithError);
            garbledTextOutput.textContent = garbledText;

            let [encodedArray, padding] = GolayCode.encodeAnySize(binaryArray);
            let [__, encodedArrayWithError] = introduceErrors(encodedArray.slice(), errorPercentage);
            let decodedArray = GolayCode.decodeAnySize(encodedArrayWithError, padding);
            
            let decodedText = binaryArrayToText(decodedArray);
            decodedTextOutput.textContent = decodedText;
        }
    });
});

function textToBinaryArray(text) {
    return text.split('').flatMap(char => 
        char.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number)
    );
}

function binaryArrayToText(binaryArray) {
    let binaryStr = binaryArray.join('');
    return binaryStr.match(/.{1,8}/g).map(byte => 
        String.fromCharCode(parseInt(byte, 2))
    ).join('');
}
