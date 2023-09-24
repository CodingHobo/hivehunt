import pica from 'pica';

const resizeImage = async (file) => {
  const fileType = file.type || 'image/jpeg'; // default to jpeg if the type is not provided
  return new Promise(async (resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxSide = 1024;
      const scaleFactor = Math.min(maxSide / img.width, maxSide / img.height);
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      pica().resize(img, canvas)
        .then(result => pica().toBlob(result, fileType, 0.90)) // Use the original fileType here
        .then(blob => {
          URL.revokeObjectURL(img.src);
          resolve(blob);
        })
        .catch(error => {
          URL.revokeObjectURL(img.src);
          reject(error);
        });
    };
    img.onerror = reject;
  });
};

export default resizeImage;
