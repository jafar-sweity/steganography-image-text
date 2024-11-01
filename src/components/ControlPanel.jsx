import React from "react";

function ControlPanel({
  numBits,
  setNumBits,
  hideSecretText,
  restoreSecretText,
  resultImage,
}) {
  const saveImage = () => {
    if (!resultImage) {
      alert("No result image to save.");
      return;
    }
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "result.bmp";
    link.click();
  };

  return (
    <div className="right-section">
      <h2>Main Control Buttons</h2>
      <div className="control-panel">
        <label>Select number of bits:</label>
        <select
          value={numBits}
          onChange={(e) => setNumBits(parseInt(e.target.value))}
        >
          <option value={1}>1 bit</option>
          <option value={2}>2 bits</option>
          <option value={3}>3 bits</option>
        </select>
      </div>
      <button onClick={hideSecretText}>Hide Secret Text</button>
      <button onClick={restoreSecretText}>Restore Secret Text</button>
      <button onClick={saveImage}>Save Result Image</button>
      <button onClick={() => window.location.reload()}>Clear</button>
    </div>
  );
}

export default ControlPanel;
