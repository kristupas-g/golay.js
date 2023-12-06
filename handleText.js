document.addEventListener("DOMContentLoaded", () => {
    // Event listener for DOMContentLoaded event
    const handleTextButton = document.getElementById('handleText');
    const textToEncodeInput = document.getElementById('textToEncode');
    const errorPercentageInput = document.getElementById('errorPercentage');
    const garbledTextOutput = document.getElementById('garbledTextOutput');
    const decodedTextOutput = document.getElementById('decodedTextOutput');

    handleTextButton.addEventListener('click', () => {
        // Event handler for the 'handleText' button click
        const textToEncode = textToEncodeInput.value;
        if (textToEncode) {
            // Convert text to binary array
            let binaryArray = textToBinaryArray(textToEncode);
            // Parse error percentage or default to 0
            let errorPercentage = parseFloat(errorPercentageInput.value) || 0;

            // Introduce errors and display garbled text
            let [_, binaryArrayWithError] = introduceErrors(binaryArray.slice(), errorPercentage);
            let garbledText = binaryArrayToText(binaryArrayWithError);
            garbledTextOutput.textContent = garbledText;

            // Encode, introduce errors, decode, and display decoded text
            let [encodedArray, padding] = GolayCode.encodeAnySize(binaryArray);
            let [errorPositions, encodedArrayWithError] = introduceErrors(encodedArray.slice(), errorPercentage);
            let decodedArray = GolayCode.decodeAnySize(encodedArrayWithError, padding);
            
            let decodedText = binaryArrayToText(decodedArray);
            decodedTextOutput.textContent = decodedText;
        }
    });
});

function textToBinaryArray(text) {
    return text.split('').map(char => 
        char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join('').split('').map(bit => parseInt(bit));
}

function binaryArrayToText(bits) {
    return bits
        .join('')
        .match(/.{1,8}/g)
        .map(byte => String.fromCharCode(parseInt(byte, 2)))
        .join('');
}

