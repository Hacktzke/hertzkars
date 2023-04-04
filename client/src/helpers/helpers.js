export const formatDateDMY = (fullDate) => {
  const year = fullDate.slice(0, fullDate.indexOf('-'));
  let editedDate = fullDate.slice(fullDate.indexOf('-') + 1, -1);
  const month = editedDate.slice(0, editedDate.indexOf('-'));
  editedDate = editedDate.slice(editedDate.indexOf('-') + 1, -1);
  const day = editedDate.slice(0, editedDate.indexOf('T'));

  return `${day}/${month}/${year}`;
};

export const randomColor = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  // BELOW RETURNS HEX VALUE.
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};
