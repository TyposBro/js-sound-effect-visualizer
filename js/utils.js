export const getElem = (selector) => document.querySelector(selector);

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Usage
// const file = document.querySelector("#fileInput").files[0]; // Assuming you have a file input element with id 'fileInput'

// convertToBase64(file).then((data) => {
//   console.log(data); // This will log the base64 string of the audio file
// });
