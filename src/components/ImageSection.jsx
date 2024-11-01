import React from "react";

function ImageSection({ coverImage, setCoverImage, resultImage }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Cover Section */}
      <div className="section">
        <h2>Cover</h2>
        {coverImage ? (
          <img src={coverImage} alt="Cover" className="image-display" />
        ) : (
          <div className="placeholder">No Image Selected</div>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* Result Section */}
      <div className="section">
        <h2>Result</h2>
        {resultImage ? (
          <img src={resultImage} alt="Result" className="image-display" />
        ) : (
          <div className="placeholder">No Result Yet</div>
        )}
      </div>
    </>
  );
}

export default ImageSection;
