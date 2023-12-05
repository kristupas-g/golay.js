class BinaryMatrix {
    constructor(height = 0, width = 0, data = []) {
        // Initialize matrix dimensions and elements
        this.height = height;
        this.width = width;
        this.elements = data.length === 0 
            ? Array.from({ length: width * height }, () => 0)  // If no data, create zero matrix
            : data.map(value => value % 2);  // Convert input data to binary
    }

    get(i, j) {
        // Retrieve element at position (i, j)
        return this.elements[i * this.width + j];
    }

    set(i, j, val) {
        // Set element at position (i, j) to binary value of val
        this.elements[i * this.width + j] = val % 2;
    }

    _validateLength(length, expected, dimension) {
        // Internal method to validate row/column length
        if (length !== expected) {
            throw new Error(`${dimension} length does not match matrix ${dimension}`);
        }
    }

    addRow(row) {
        // Add a row to the matrix
        this._validateLength(row.length, this.width, 'Row');
        this.elements.push(...row.map(value => value % 2));
        this.height++;
    }

    addCol(col) {
        // Add a column to the matrix
        this._validateLength(col.length, this.height, 'Column');
        col.forEach((value, index) => {
            this.elements.splice(this.width * (index + 1) + index, 0, value % 2);
        });
        this.width++;
    }

    clone() {
        // Create a copy of the matrix
        return new BinaryMatrix(this.height, this.width, [...this.elements]);
    }

    _getSegment(start, end) {
        // Internal method to extract a segment of elements
        return this.elements.slice(start, end);
    }

    getRow(row) {
        // Retrieve a specific row
        return this._getSegment(this.width * row, this.width * (Number(row) + 1));
    }

    getCol(col) {
        // Retrieve a specific column
        return Array.from({ length: this.height }, (_, i) => this.get(i, col));
    }

    getRows() {
        // Retrieve all rows
        return Array.from({ length: this.height }, (_, i) => this.getRow(i));
    }

    _checkDimensions(b, checkForMultiplication = false) {
        // Internal method to check matrix dimensions for operations
        const dimensionMismatch = checkForMultiplication
            ? this.width !== b.height
            : this.width !== b.width || this.height !== b.height;

        if (dimensionMismatch) {
            throw new Error('Matrices dimensions do not match');
        }
    }

    add(b) {
        // Add two matrices
        this._checkDimensions(b);
        return new BinaryMatrix(this.height, this.width, this.elements.map((v, i) => (v + b.elements[i]) % 2));
    }

    addTo(i, j, val) {
        // Add value to specific element (i, j)
        this.set(i, j, (this.get(i, j) + val) % 2);
    }

    transpose() {
        // Transpose the matrix
        const newMatrix = new BinaryMatrix(this.width, this.height);
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                newMatrix.set(j, i, this.get(i, j));
            }
        }
        return newMatrix;
    }

    mult(b) {
        // Multiply two matrices
        this._checkDimensions(b, true);
        return new BinaryMatrix(this.height, b.width).fill((i, j) => 
            Array.from({ length: this.width }, (_, k) => this.get(i, k) * b.get(k, j)).reduce((a, c) => a + c) % 2
        );
    }

    toString(lineBreak = '\n') {
        // Convert matrix to string representation
        return this.getRows().map(row => row.join(' ')).join(lineBreak);
    }
}

BinaryMatrix.prototype.fill = function (filler) {
    // Fill the matrix with values from a filler function
    for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
            this.set(i, j, filler(i, j));
        }
    }
    return this;
};
