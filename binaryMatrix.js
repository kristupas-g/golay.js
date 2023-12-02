class BinaryMatrix {
    constructor(height = 0, width = 0, data = []) {
        this.height = height;
        this.width = width;
        this.elements = data.length === 0 
            ? Array.from({ length: width * height }, () => 0)
            : data.map(value => value % 2);
    }

    get(i, j) {
        return this.elements[i * this.width + j];
    }

    set(i, j, val) {
        this.elements[i * this.width + j] = val % 2;
    }

    _validateLength(length, expected, dimension) {
        if (length !== expected) {
            throw new Error(`${dimension} length does not match matrix ${dimension}`);
        }
    }

    addRow(row) {
        this._validateLength(row.length, this.width, 'Row');
        this.elements.push(...row.map(value => value % 2));
        this.height++;
    }

    addCol(col) {
        this._validateLength(col.length, this.height, 'Column');
        col.forEach((value, index) => {
            this.elements.splice(this.width * (index + 1) + index, 0, value % 2);
        });
        this.width++;
    }

    clone() {
        return new BinaryMatrix(this.height, this.width, [...this.elements]);
    }

    _getSegment(start, end) {
        return this.elements.slice(start, end);
    }

    getRow(row) {
        return this._getSegment(this.width * row, this.width * (Number(row) + 1));
    }

    getCol(col) {
        return Array.from({ length: this.height }, (_, i) => this.get(i, col));
    }

    getRows() {
        return Array.from({ length: this.height }, (_, i) => this.getRow(i));
    }

    _checkDimensions(b, checkForMultiplication = false) {
        const dimensionMismatch = checkForMultiplication
            ? this.width !== b.height
            : this.width !== b.width || this.height !== b.height;

        if (dimensionMismatch) {
            throw new Error('Matrices dimensions do not match');
        }
    }

    add(b) {
        this._checkDimensions(b);
        return new BinaryMatrix(this.height, this.width, this.elements.map((v, i) => (v + b.elements[i]) % 2));
    }

    addTo(i, j, val) {
        this.set(i, j, (this.get(i, j) + val) % 2);
    }

    transpose() {
        const newMatrix = new BinaryMatrix(this.width, this.height);
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                newMatrix.set(j, i, this.get(i, j));
            }
        }
        return newMatrix;
    }

    mult(b) {
        this._checkDimensions(b, true);
        return new BinaryMatrix(this.height, b.width).fill((i, j) => 
            Array.from({ length: this.width }, (_, k) => this.get(i, k) * b.get(k, j)).reduce((a, c) => a + c) % 2
        );
    }

    toString(lineBreak = '\n') {
        return this.getRows().map(row => row.join(' ')).join(lineBreak);
    }
}

BinaryMatrix.prototype.fill = function (filler) {
    for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
            this.set(i, j, filler(i, j));
        }
    }
    return this;
};
