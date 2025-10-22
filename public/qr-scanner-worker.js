// Simple script to load jsQR library for QR code scanning
// This will be loaded in the main HTML to support QR scanning functionality

if (typeof window !== 'undefined') {
  // Load jsQR library dynamically
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
  script.async = true;
  document.head.appendChild(script);
}
