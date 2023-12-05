const weight = vec => {
    // Calculate the Hamming weight (number of non-zero elements) of a vector
    let vector = vec.isMatrx ? vec.elements : vec;
    return vector.reduce((count, element) => count + (element !== 0 ? 1 : 0), 0);
};

const makeArray = (length, value = 0) => {
    // Create an array of a specific length, filled with a specified value
    return Array(length).fill(value);
};

const addVectors = (a, b) => {
    // Add two vectors element-wise
    if (a.length !== b.length) {
        throw new Error('Vectors must have the same length');
    }
    return a.map((elem, index) => elem + b[index]);
};

const modTwo = vec => {
    // Apply modulo 2 to each element of a vector
    return vec.map(x => x % 2);
};

const eyeVector = (size, n) => {
    // Create a vector with all zeros and a single one at position n
    return Array(size).fill(0).map((_, index) => index === n ? 1 : 0);
};

function introduceErrors(binaryVector, errorPercentage) {
    // Introduce a specified percentage of errors into a binary vector
    const errorPositions = [];
    const vectorLength = binaryVector.length;
    const numberOfErrors = Math.round(vectorLength * (errorPercentage / 100));
    
    for (let i = 0; i < numberOfErrors; i++) {
        let position;
        do {
            // Generate a unique random position for each error
            position = Math.floor(Math.random() * vectorLength);
        } while (errorPositions.includes(position));

        errorPositions.push(position);
        binaryVector[position] = binaryVector[position] === 1 ? 0 : 1;
    }

    return [errorPositions, binaryVector];
}

function stringToBits(str) {
    // Convert a string to an array of bits
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
    // Convert an array of bits back to a string
    let result = '';
    for (let i = 0; i < bits.length; i += 8) {
        let byte = bits.slice(i, i + 8);
        let ascii = byte.reduce((acc, bit, index) => acc + (bit ? 1 << (7 - index) : 0), 0);
        result += String.fromCharCode(ascii);
    }
    return result;
}
