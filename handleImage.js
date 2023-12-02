document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('fileUpload').addEventListener('change', handleFileSelect, false);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file.type === "image/bmp") {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const arrayBuffer = e.target.result;
                const bitmapData = new Uint8Array(arrayBuffer);
                
                const bitArray = uint8ArrayToBitArray(bitmapData);
                
                const originalImage = createImage(bitmapData, 'original');
                document.getElementById('imageOutput').appendChild(originalImage);
                
                const errorPercentage = parseInt(document.getElementById('errorPercentage').value);
                const vectorWithErrors = introduceErrorsForImage(bitArray.slice(), errorPercentage);
                const vectorWithErrorsUint8 = bitArrayToUint8Array(vectorWithErrors);
                const noisyImage = createImage(vectorWithErrorsUint8, 'noisy');
                document.getElementById('imageOutput').appendChild(noisyImage);
                
                const [ encoded, padding ] = GolayCode.encodeAnySize(bitArray.slice());
                const vectorWithErrorsEncoded = introduceErrorsForImage(encoded.slice(), errorPercentage);
                const decoded = GolayCode.decodeAnySize(vectorWithErrorsEncoded, padding);
                const decodedUint8 = bitArrayToUint8Array(decoded);
                
                const recoveredImage = createImage(decodedUint8, 'recovered');
                document.getElementById('imageOutput').appendChild(recoveredImage);
            };
            
            reader.readAsArrayBuffer(file);
        } else {
            alert('Please upload a BMP image.');
        }
    }

    function uint8ArrayToBitArray(uint8Array) {
        const bitArray = [];
        for (let i = 0; i < uint8Array.length; i++) {
            for (let j = 7; j >= 0; j--) {
                bitArray.push((uint8Array[i] >> j) & 1);
            }
        }
        return bitArray;
    }

    function bitArrayToUint8Array(bitArray) {
        const uint8Array = new Uint8Array(Math.ceil(bitArray.length / 8));
        for (let i = 0; i < bitArray.length; i++) {
            uint8Array[Math.floor(i / 8)] |= bitArray[i] << (7 - (i % 8));
        }
        return uint8Array;
    }

    function createImage(dataArray, idSuffix) {
        const blob = new Blob([dataArray], { type: "image/bmp" });
        const url = URL.createObjectURL(blob);
        const img = document.createElement("img");
        img.src = url;
        img.id = `image-${idSuffix}`;
        img.style = 'max-width: 30%; margin: 0 1.5%;'; 
        return img;
    }

    function introduceErrorsForImage(binaryVector, errorPercentage) {
        const pixelDataOffset = 432
        const pixelDataLength = binaryVector.length - pixelDataOffset;
        const numberOfErrors = Math.round(pixelDataLength * (errorPercentage / 100));
        
        const indices = Array.from({ length: pixelDataLength }, (_, i) => i + pixelDataOffset);
        
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        for (let i = 0; i < numberOfErrors; i++) {
            binaryVector[indices[i]] ^= 1;
        }
    
        return binaryVector;
    }
});
