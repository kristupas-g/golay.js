const decode = vector => {
  const mVec = new BinaryMatrix(1, vector.length, vector);
  const syndrome = mVec.mult(H.transpose());

  [GolayCode.H.transpose(), mVec, syndrome].forEach(item => logToScreen(item.toString()));
};

document.addEventListener("DOMContentLoaded", () => {
  var errorPercentageInput = document.getElementById('errorPercentage');
  errorPercentageInput.value = 3; 
  
  const addEvent = (id, handler) => document.getElementById(id).addEventListener('click', handler);

  addEvent('randomVector', () => {
    const randomInput = Array.from({ length: 12 }, () => parseInt(Math.random() * 2));
    document.getElementById('inputVector').value = randomInput.join(', ');
  });

  addEvent('encodeButton', () => {
    const inputVector = document.getElementById('inputVector').value.split(',').map(Number);
    if (inputVector.length !== 12) {
      alert('Input vector must be shorter than 12');
      return;
    }
    document.getElementById('encodedVector').value = GolayCode.encode(inputVector).join(', ');
  });

  addEvent('addNoiseButton', () => {
    const output = document.getElementById('encodedVector').value.split(',').map(Number);
    const errorPercentage = parseFloat(document.getElementById('errorPercentage').value);
    const [ errorPositions, transmittedVector ] = introduceErrors(output, errorPercentage);
    document.getElementById('transmittedVector').value = transmittedVector.join(', ');
    document.getElementById('curruptedBits').innerText = errorPositions.length;
    document.getElementById('errorPositions').innerText = errorPositions.join(', ');
    document.getElementById('message').innerText = errorPositions.length > 3 ? 
      'Too many errors!!!' : '';
  });

  addEvent('decodeButton', () => {
    const input = document.getElementById('transmittedVector').value.split(',').map(Number);
    decoded_vector = GolayCode.decode(input);
    document.getElementById('decodedVector').value = decoded_vector.join(', ');
    document.getElementById('finalResult').value = decoded_vector.slice(0, 12).join(', ');
  });

  GolayCode.setLogger(logToScreen);
  // GolayCode.setLogger(null);
});

const logToScreen = (...args) => {
  const message = args.join(' ');
  console.log(message);
};
