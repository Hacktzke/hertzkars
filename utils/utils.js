export const randomColor = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export const formatName = (name) => {
  let lowerCase = name.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};
