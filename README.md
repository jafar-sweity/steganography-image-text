# Steganography: Hiding Secret Text in Images

This project demonstrates a simple method of steganography by hiding secret text inside an image using JavaScript and HTML5 Canvas. The project allows you to encode a message into an image and later extract the message from that image.

## Features

- **Hide Secret Text:** Embed a secret message inside an image by modifying the least significant bits (LSB) of the image’s pixels.
- **Restore Secret Text:** Extract and decode the hidden message from an image.
- **Customizable Bit Depth:** The number of bits used to hide the secret message can be adjusted for different levels of secrecy.

## Technologies Used

- React.js
- JavaScript (ES6)
- HTML5 Canvas API

## How It Works

1. **Hide Secret Text:**

   - The secret message is converted into its binary form.
   - The binary data is embedded in the LSB (Least Significant Bit) of the image’s pixel data.
   - A null terminator (`\0`) is added to mark the end of the secret message.

2. **Restore Secret Text:**
   - The pixel data is scanned, and the binary data hidden in the LSBs is extracted.
   - The binary data is converted back to characters until the null terminator (`\0`) is reached.

## Setup Instructions

```bash
git clone https://github.com/jafar-sweity/steganography-image-text.git
cd steganography-image-text
npm i
npm run dev
```

## Usage

1. Upload an image file (preferably .bmp for better results).
2. Enter the secret text you want to hide.
3. Click "Hide Secret Text" to embed the message in the image.

4. Save or view the modified image with the hidden message.

5. To extract the hidden message, upload the image with the hidden data and click "Restore Secret Text".
