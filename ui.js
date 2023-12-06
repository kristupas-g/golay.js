const decode = vector => {
  // Decode function for a given vector
  const mVec = new BinaryMatrix(1, vector.length, vector);
  const syndrome = mVec.mult(H.transpose());

  // Log the H matrix, the vector, and the syndrome to the screen
  [GolayCode.H.transpose(), mVec, syndrome].forEach(item => logToScreen(item.toString()));
};

document.addEventListener("DOMContentLoaded", () => {
  // Event listener for DOMContentLoaded event
  var errorPercentageInput = document.getElementById('errorPercentage');
  errorPercentageInput.value = 3;  // Set default error percentage to 3
  
  const addEvent = (id, handler) => document.getElementById(id).addEventListener('click', handler);

  // Add event listeners to various buttons
  addEvent('randomVector', () => {
    // Generate a random input vector
    const randomInput = Array.from({ length: 12 }, () => parseInt(Math.random() * 2));
    document.getElementById('inputVector').value = randomInput.join(', ');
  });

  addEvent('encodeButton', () => {
    // Encode the input vector using GolayCode
    const inputVector = document.getElementById('inputVector').value.split(',').map(Number);
    if (inputVector.length !== 12) {
      alert('Input vector must be shorter than 12');
      return;
    }
    document.getElementById('encodedVector').value = GolayCode.encode(inputVector).join(', ');
  });

  addEvent('addNoiseButton', () => {
    // Add noise to the encoded vector based on the error percentage
    const output = document.getElementById('encodedVector').value.split(',').map(Number);
    const errorPercentage = parseFloat(document.getElementById('errorPercentage').value);
    const [errorPositions, transmittedVector] = introduceErrors(output, errorPercentage);
    document.getElementById('transmittedVector').value = transmittedVector.join(', ');
    document.getElementById('curruptedBits').innerText = errorPositions.length;
    document.getElementById('errorPositions').innerText = errorPositions.join(', ');
    document.getElementById('message').innerText = errorPositions.length > 3 ? 
      'Too many errors!!!' : '';
  });

  addEvent('decodeButton', () => {
    // Decode the transmitted vector and display the results
    const input = document.getElementById('transmittedVector').value.split(',').map(Number);
    decoded_vector = GolayCode.decode(input);
    document.getElementById('decodedVector').value = decoded_vector.join(', ');
    document.getElementById('finalResult').value = decoded_vector.slice(0, 12).join(', ');
  });

  // Set logger for GolayCode to log to screen
  // GolayCode.setLogger(logToScreen);
  // Uncomment the below line to disable logging
  GolayCode.setLogger(null);
});

const logToScreen = (...args) => {
  // Function to log messages to the screen
  const message = args.join(' ');
  console.log(message);
};

