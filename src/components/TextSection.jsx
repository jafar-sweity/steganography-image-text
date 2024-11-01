import React from "react";

function TextSection({ secretText, setSecretText }) {
  const handleTextChange = (e) => {
    setSecretText(e.target.value);
  };

  return (
    <div className="section">
      <h2>Secret</h2>
      <textarea
        value={secretText}
        onChange={handleTextChange}
        placeholder="Enter secret text here..."
        rows="5"
        className="text-area"
      />
    </div>
  );
}

export default TextSection;
