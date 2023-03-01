export const formatDateDMY = (fullDate) => {
  const year = fullDate.slice(0, fullDate.indexOf('-'));
  let editedDate = fullDate.slice(fullDate.indexOf('-') + 1, -1);
  const month = editedDate.slice(0, editedDate.indexOf('-'));
  editedDate = editedDate.slice(editedDate.indexOf('-') + 1, -1);
  const day = editedDate.slice(0, editedDate.indexOf('T'));

  return `${day}/${month}/${year}`;
};

export const randomColor = () => {
  let r = Math.floor(Math.random() * 190) + 30;
  let g = Math.floor(Math.random() * 190) + 30;
  let b = Math.floor(Math.random() * 190) + 30;
  return `rgb(${r}, ${g}, ${b})`;
};
