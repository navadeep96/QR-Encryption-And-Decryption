# QR Document Encryptor

Encrypt your documents into QR codes and share them securely. Download from any device, anywhere.

## 🌟 Features

- **Military-Grade Encryption**: AES-256 encryption for maximum security
- **Cross-Device Access**: Download encrypted files from any device
- **Multiple File Types**: Support for images, documents, text files, and more
- **Password Protected**: Files require a password to decrypt
- **No Server Required**: All encryption happens locally on your device
- **User-Friendly UI**: Intuitive interface with drag-and-drop support
- **Fast & Efficient**: Quick encryption and decryption
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (only for initial page load)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/navadeep96/QR-Document-Encryptor.git
cd QR-Document-Encryptor
```

2. Open `index.html` in your web browser

3. No additional setup required!

## 📖 Usage

### Encrypting a Document

1. Go to the **Encrypt** page
2. Click to upload or drag-and-drop your file
3. Set a strong password
4. Click "Encrypt & Generate QR Code"
5. Download the QR code or copy the encrypted data
6. Share the QR code with others

### Decrypting a Document

1. Go to the **Decrypt** page
2. Paste the encrypted QR data or upload the QR code image
3. Enter the decryption password
4. Click "Decrypt & Download"
5. Your original file will be downloaded

## 🔐 Security

- **Client-Side Encryption**: All encryption/decryption happens on your device
- **AES-256**: Industry-standard encryption algorithm
- **No Logging**: Files and passwords are never stored on servers
- **No Tracking**: Complete privacy and anonymity
- **Open Source**: Code is transparent and auditable

## 📊 File Specifications

### Supported File Types
- **Images**: JPG, PNG, GIF, BMP, WebP
- **Documents**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- **Text**: TXT, CSV, JSON, XML
- **Archives**: ZIP, RAR

### Limits
- **Maximum file size**: 5MB
- **QR Code capacity**: Up to 2953 bytes of data

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Encryption**: CryptoJS (AES-256)
- **QR Generation**: QRCode.js
- **No Backend**: Fully client-side application

## 📦 Dependencies

All dependencies are loaded from CDN:
- CryptoJS: `https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.0/crypto-js.min.js`
- QRCode.js: `https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js`

## 🎨 Customization

You can customize the application by modifying:
- `css/styles.css` - Change colors, fonts, and layout
- `js/encryption.js` - Modify encryption methods
- HTML files - Update content and structure

## 🐛 Troubleshooting

### Issue: "Decryption failed. Wrong password or corrupted data."
- Ensure you're using the correct password
- Make sure the encrypted data is complete and not truncated
- Try copying the QR data again

### Issue: File size exceeds 5MB
- Compress the file first using a ZIP tool
- Split large files into smaller parts
- Encrypt each part separately

### Issue: Browser compatibility
- Use a modern browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Clear browser cache if you encounter issues

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Navadeep96** - [GitHub](https://github.com/navadeep96)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Changelog

### Version 1.0.0
- Initial release
- Basic encryption and decryption
- QR code generation
- Password protection
- Cross-device support

## 🙏 Acknowledgments

- CryptoJS for encryption
- QRCode.js for QR generation
- Community feedback and suggestions

## ⚖️ Disclaimer

This tool is provided as-is for educational and personal use. Users are responsible for:
- Complying with local laws regarding encryption
- Keeping their passwords secure
- Responsible use of shared data

---

**⭐ If you found this project helpful, please give it a star!**

For questions or support, please open an issue on GitHub.
