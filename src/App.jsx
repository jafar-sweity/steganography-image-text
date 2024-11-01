import React, { useState } from "react";
import ImageSection from "./components/ImageSection";
import TextSection from "./components/TextSection";
import ControlPanel from "./components/ControlPanel";
import "./App.css";

function App() {
  const [coverImage, setCoverImage] = useState(null);
  const [secretText, setSecretText] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [numBits, setNumBits] = useState(1);

  const hideSecretText = () => {
    if (!coverImage || !secretText) {
      alert("Please upload an image and enter the secret text.");
      return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = coverImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imgData = context.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;

      const secretWithTerminator = secretText + "\0";

      let binaryText = "";
      for (let i = 0; i < secretWithTerminator.length; i++) {
        let binaryChar = secretWithTerminator[i]
          .charCodeAt(0)
          .toString(2)
          .padStart(8, "0");
        binaryText += binaryChar;
      }

      let dataIdx = 0;
      for (let i = 0; i < binaryText.length; i++) {
        if (dataIdx >= data.length) {
          alert("Image is too small for the secret text.");
          return;
        }
        let bitToHide = binaryText[i];
        data[dataIdx] = clearAndSetLSB(data[dataIdx], bitToHide, numBits);
        dataIdx += 4;
      }

      context.putImageData(imgData, 0, 0);
      setResultImage(canvas.toDataURL("image/bmp"));
    };
  };

  const restoreSecretText = () => {
    if (!resultImage) {
      alert("No image with hidden secret to restore from.");
      return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = resultImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      const imgData = context.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;

      let binaryText = "";
      let charBits = "";

      for (let i = 0; i < data.length; i += 4) {
        const lsb = getLSB(data[i], numBits); 
        charBits += lsb;

        if (charBits.length === 8) {
          const char = String.fromCharCode(parseInt(charBits, 2));

          if (char === "\0") {
            break;
          }

          binaryText += char;
          charBits = ""; 
        }
      }

      setSecretText(binaryText); 
      alert("Extracted secret text: " + binaryText); 
    };
  };
  
  const clearAndSetLSB = (colorValue, bitToHide, numBits) => {
    const mask = 0xff << numBits;
    const clearedValue = colorValue & mask;
    const hiddenValue = clearedValue | parseInt(bitToHide);
    return hiddenValue;
  };

  const getLSB = (colorValue, numBits) => {
    const mask = (1 << numBits) - 1;
    return colorValue & mask;
  };

  return (
    <div className="App">
      <div className="left-section">
        <ImageSection
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          resultImage={resultImage}
        />
        <TextSection secretText={secretText} setSecretText={setSecretText} />
      </div>
      <ControlPanel
        numBits={numBits}
        setNumBits={setNumBits}
        hideSecretText={hideSecretText}
        restoreSecretText={restoreSecretText}
        resultImage={resultImage}
      />
    </div>
  );
}

export default App;
