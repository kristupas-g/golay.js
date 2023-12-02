const weight = vec => {
    let vector = vec.isMatrx ? vec.elements : vec;
    return vector.reduce((count, element) => count + (element !== 0 ? 1 : 0), 0);
};

const makeArray = (length, value = 0) => Array(length).fill(value);

const addVectors = (a, b) => {
    if (a.length !== b.length) {
        throw new Error('Vectors must have the same length');
    }
    return a.map((elem, index) => elem + b[index]);
};

const modTwo = vec => vec.map(x => x % 2);

const eyeVector = (size, n) => Array(size).fill(0).map((_, index) => index === n ? 1 : 0);

function introduceErrors(binaryVector, errorPercentage) {
    const errorPositions = [];
    const vectorLength = binaryVector.length;
    const numberOfErrors = Math.round(vectorLength * (errorPercentage / 100));
    
    for (let i = 0; i < numberOfErrors; i++) {
        let position;
        do {
            position = Math.floor(Math.random() * vectorLength);
        } while (errorPositions.includes(position));

        errorPositions.push(position);
        binaryVector[position] = binaryVector[position] === 1 ? 0 : 1;
    }

    return [ errorPositions, binaryVector ];
}

function stringToBits(str) {
    const result = [];
    for (let i = 0; i < str.length; i++) {
        const binary = str.charCodeAt(i).toString(2);
        for (let j = 0; j < binary.length; j++) {
            result.push(binary[j] === '1');
        }
    }
    return result;
}
function bitsToString(bits) {
    let result = '';
    for (let i = 0; i < bits.length; i += 8) {
        let byte = bits.slice(i, i + 8);
        let ascii = byte.reduce((acc, bit, index) => acc + (bit ? 1 << (7 - index) : 0), 0);
        result += String.fromCharCode(ascii);
    }
    return result;
}
