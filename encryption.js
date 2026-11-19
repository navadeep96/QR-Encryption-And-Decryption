// AES-256 Encryption using TweetNaCl.js (or use crypto-js)
// Install: npm install crypto-js tweetnacl

// Simple encryption using CryptoJS (add this to HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.0/crypto-js.min.js"></script>)

class DocumentEncryptor {
    constructor() {
        this.selectedFile = null;
        this.encryptedData = null;
    }

    // Generate a random encryption key
    generateKey() {
        return CryptoJS.lib.WordArray.random(256 / 8);
    }

    // Encrypt file with password
    async encryptFile(file, password) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const fileData = e.target.result;
                    
                    // Create metadata
                    const metadata = {
                        filename: file.name,
                        filesize: file.size,
                        filetype: file.type,
                        timestamp: new Date().toISOString()
                    };

                    // Combine file data with metadata
                    const jsonString = JSON.stringify({
                        metadata: metadata,
                        data: this.arrayBufferToBase64(fileData)
                    });

                    // Encrypt with password
                    const encrypted = CryptoJS.AES.encrypt(
                        jsonString,
                        password
                    ).toString();

                    resolve(encrypted);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('File reading failed'));
            reader.readAsArrayBuffer(file);
        });
    }

    // Decrypt data with password
    async decryptData(encryptedData, password) {
        try {
            const decrypted = CryptoJS.AES.decrypt(
                encryptedData,
                password
            ).toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                throw new Error('Decryption failed. Wrong password or corrupted data.');
            }

            const parsed = JSON.parse(decrypted);
            return parsed;
        } catch (error) {
            throw new Error('Decryption failed: ' + error.message);
        }
    }

    // Convert ArrayBuffer to Base64
    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    // Convert Base64 to ArrayBuffer
    base64ToArrayBuffer(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // Upload encrypted data to dpaste (more reliable CORS)
    async uploadEncryptedPayload(encryptedString) {
        try {
            const formData = new URLSearchParams();
            formData.append('content', encryptedString);
            formData.append('lexer', 'text');
            formData.append('expires', '7'); // expires in 7 days
            
            const response = await fetch(`https://dpaste.com/api/v2/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status: ${response.status}`);
            }
            
            const pasteUrl = await response.text();
            const match = pasteUrl.trim().match(/dpaste\.com\/([a-zA-Z0-9]+)/);
            
            if (match && match[1]) {
                return match[1];
            }
            throw new Error('Could not parse cloud identifier.');
        } catch (error) {
            throw new Error('Failed to upload to cloud storage. Please check your internet connection.');
        }
    }

    // Download encrypted data from dpaste
    async downloadEncryptedPayload(binId) {
        try {
            const response = await fetch(`https://dpaste.com/${binId}.txt`, {
                headers: {
                    'Accept': 'text/plain, */*'
                }
            });
            if (!response.ok) {
                throw new Error('File not found or expired on the server.');
            }
            const text = await response.text();
            const cleanText = text.trim();
            
            if (cleanText.toLowerCase().startsWith('<!doctype html') || cleanText.toLowerCase().startsWith('<html')) {
                throw new Error('Cloud storage returned a web page instead of the raw file. Please try again later.');
            }
            return cleanText;
        } catch (error) {
            throw new Error(error.message.includes('Cloud') ? error.message : 'Failed to download from cloud storage.');
        }
    }

    // Generate QR Code
    async generateQRCode(data) {
        try {
            // Using QRCode.js library
            const qr = new QRCode(document.getElementById('qrCode'), {
                text: data,
                width: 256,
                height: 256,
                colorDark: '#000',
                colorLight: '#fff',
                correctLevel: QRCode.CorrectLevel.L
            });
            return qr;
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("reading '3'")) {
                throw new Error("File is too large to fit in a QR code. Maximum supported size after encryption is around 2KB.");
            }
            throw error;
        }
    }

    // Download file from decrypted data
    downloadFile(data) {
        const arrayBuffer = this.base64ToArrayBuffer(data.data);
        const blob = new Blob([arrayBuffer], { type: data.metadata.filetype });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.metadata.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Download QR Code as image
    downloadQRCode() {
        const canvas = document.querySelector('#qrCode canvas');
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'encrypted-qr-code.png';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Copy QR Code data to clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showAlert('Copied to clipboard!', 'success');
        }).catch(() => {
            this.showAlert('Failed to copy', 'error');
        });
    }

    // Show alert message
    showAlert(message, type = 'info') {
        const alertDiv = document.getElementById('alert');
        if (alertDiv) {
            alertDiv.textContent = message;
            alertDiv.className = `alert alert-${type} show`;
            setTimeout(() => {
                alertDiv.classList.remove('show');
            }, 3000);
        }
    }
}

// Initialize
const encryptor = new DocumentEncryptor();