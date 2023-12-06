class GolayCode {
    static encodeAnySize(vec) {
        const t0 = performance.now();
        // Encode a vector of any size using Golay code
        let padding = 0;
        // Pad the vector to a multiple of 12
        if (vec.length % 12 !== 0) {
            padding = 12 - (vec.length % 12);
            vec = vec.concat(new Array(padding).fill(0));
        }

        let encodedVec = [];
        // Encode each 12-bit chunk
        for (let i = 0; i < vec.length; i += 12) {
            const chunk = vec.slice(i, i + 12);
            encodedVec = encodedVec.concat(GolayCode.encode(chunk));
        }

        const t1 = performance.now();

        console.log('Encoding time: ' , t1 - t0 , ' ms')

        return [encodedVec, padding];
    }

    static decodeAnySize(encodedVec, padding) {
        const t0 = performance.now();
        // Decode a vector of any size encoded with Golay code
        let decodedVec = [];
        // Decode each 24-bit chunk
        for (let i = 0; i < encodedVec.length; i += 24) {
            const chunk = encodedVec.slice(i, i + 24);
            const decodedChunk = GolayCode.decode(chunk).slice(0, 12);
            decodedVec = decodedVec.concat(decodedChunk);
        }
        
        // Remove padding if added during encoding
        if (padding > 0) {
            decodedVec = decodedVec.slice(0, -padding);
        }

        const t1 = performance.now();

        console.log('Decoding time: ' , t1 - t0 , ' ms')

        return decodedVec;
    }

    static encode(vec) {
        // Encode a 12-bit vector using Golay code
        const matrix = vec.isBinaryMatrix ? vec : new BinaryMatrix(1, 12, vec);
        return matrix.mult(G).getRow(0);
    }

    static decode(vec) {
        // Decode a 24-bit vector encoded with Golay code
        if (!vec.isBinaryMatrix) {
            vec = new BinaryMatrix(1, 24, vec);
        }

        const handleSyndrome = (syndrome, isSecond) => {
            // Handle syndrome for decoding
            GolayCode.Log(isSecond ? 'Handling 2nd Syndrome' : 'Handling Syndrome');
            const bRows = B.getRows();
            for (let i in bRows) {
                i = parseInt(i);
                const cur = modTwo(addVectors(syndrome, bRows[i]));

                if (weight(cur) <= 2) {
                    const u = isSecond ? eyeVector(12, i).concat(cur) : cur.concat(eyeVector(12, i));
                    return modTwo(addVectors(u, vec));
                }
            }
            return null;
        }

        let syndrome = vec.mult(H.transpose()).getRow(0);
        // Log the syndrome for debugging
        GolayCode.Log('Syndrome:', syndrome.join(', '));

        vec = vec.getRow(0);

        if (weight(syndrome) <= 3) {
            // Direct solution if weight is less than or equal to 3
            GolayCode.Log('Weight <= 3, solution found');
            return modTwo(addVectors(syndrome.concat(makeArray(12)), vec));
        }

        // Handle first syndrome
        let result = handleSyndrome(syndrome, false);
        if (result) return result;

        // Generate and handle second syndrome
        syndrome = new BinaryMatrix(1, syndrome.length, syndrome).mult(B).getRow(0);
        GolayCode.Log('2nd Syndrome:', syndrome.join(', '));

        if (weight(syndrome) <= 3) {
            GolayCode.Log('2nd Syndrome Weight <= 3, solution found');
            return modTwo(addVectors(makeArray(12).concat(syndrome), vec));
        }

        result = handleSyndrome(syndrome, true);
        if (result) {
            GolayCode.Log('Solution found');
            return result;
        }

        // If no solution is found, log and return empty array
        GolayCode.Log('Data too corrupted, no solution');
        return vec;
    }

    static Log(...args) {
        // Log messages if logger is set
        if (GolayCode.logger) GolayCode.logger(...args);
    }

    static setLogger(logger) {
        // Set a custom logger for GolayCode
        GolayCode.logger = logger;
    }
}

// Initialize logger as null
GolayCode.logger = null;
