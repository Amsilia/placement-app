/**
 * Mengonversi data Base64 ke Blob
 * @param base64Data String Base64 termasuk header (data:image/png;base64,...)
 * @returns Blob
 */
// export function convertBase64ToBlob(base64Data: string): Blob {
//   if (!base64Data) {
//     throw new Error('Base64 data is required');
//   }

//   const byteString = atob(base64Data.split(',')[1]); // Pisahkan header
//   const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]; // MIME type

//   const byteArray = new Uint8Array(byteString.length);
//   for (let i = 0; i < byteString.length; i++) {
//     byteArray[i] = byteString.charCodeAt(i);
//   }

//   return new Blob([byteArray], { type: mimeString });
// }
export function convertBase64ToBlob(base64Data: string): Blob {
    // Periksa apakah string memiliki prefiks 'data:'
    if (!base64Data.startsWith('data:')) {
      throw new Error('Invalid Base64 format: Missing data URI prefix.');
    }
  
    const [metadata, data] = base64Data.split(',');
    if (!data) {
      throw new Error('Invalid Base64 format: Missing data payload.');
    }
  
    const byteString = atob(data); // Decode Base64
    const mimeString = metadata.split(':')[1].split(';')[0]; // Extract MIME type
  
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([byteArray], { type: mimeString });
  }
  