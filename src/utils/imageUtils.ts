/**
 * Utility to downscale and compress images before storing in LocalStorage or Firestore.
 * Prevents QuotaExceededError and Firestore 1MB document limit rejections.
 */
export async function compressImage(file: File, maxWidth = 800, maxHeight = 800, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(e.target?.result as string || '');
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string || '');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use JPEG for photos, PNG if transparent logo
        const isPng = file.type === 'image/png';
        const compressed = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', quality);
        resolve(compressed);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
