class GolayCode {
    static encodeAnySize(vec) {
        let padding = 0;
        if (vec.length % 12 !== 0) {
            padding = 12 - (vec.length % 12);
            vec = vec.concat(new Array(padding).fill(0));
        }

        let encodedVec = [];
        for (let i = 0; i < vec.length; i += 12) {
            const chunk = vec.slice(i, i + 12);
            encodedVec = encodedVec.concat(GolayCode.encode(chunk));
        }

        return [ encodedVec, padding ];
    }

    static decodeAnySize(encodedVec, padding) {
        let decodedVec = [];
        for (let i = 0; i < encodedVec.length; i += 24) {
            const chunk = encodedVec.slice(i, i + 24);
            const decodedChunk = GolayCode.decode(chunk).slice(0,12);
            console.log(chunk.join(''), decodedChunk.join(''))
            decodedVec = decodedVec.concat(decodedChunk);
        }
        
        if (padding > 0) 
        {
            decodedVec = decodedVec.slice(0, -padding);
        }

        return decodedVec;
    }

    static encode(vec) {
        const matrix = vec.isBinaryMatrix ? vec : new BinaryMatrix(1, 12, vec);
        return matrix.mult(G).getRow(0);
    }

    static decode(vec) {
        if (!vec.isBinaryMatrix) {
            vec = new BinaryMatrix(1, 24, vec);
        }

        const handleSyndrome = (syndrome, isSecond) => {
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
        GolayCode.Log('Syndrome:', syndrome.join(', '));

        vec = vec.getRow(0);

        if (weight(syndrome) <= 3) {
            GolayCode.Log('Weight <= 3, solution found');
            return modTwo(addVectors(syndrome.concat(makeArray(12)), vec));
        }

        let result = handleSyndrome(syndrome, false);
        if (result) return result;

        syndrome = new BinaryMatrix(1, syndrome.length, syndrome).mult(B).getRow(0);
        GolayCode.Log('2nd Syndrome:', syndrome.join(', '));

        if (weight(syndrome) <= 3) {
            GolayCode.Log('2nd Syndrome Weight <= 3, solution found');
            return modTwo(addVectors(makeArray(12).concat(syndrome), vec));
        }

        result = handleSyndrome(syndrome, true);
        if (result) 
        {
            GolayCode.Log('Solution found');
            return result;
        }

        GolayCode.Log('Data too corrupted, no solution');
        return [];
    }

    static Log(...args) {
        if (GolayCode.logger) GolayCode.logger(...args);
    }

    static setLogger(logger) {
        GolayCode.logger = logger;
    }
}

GolayCode.logger = null;