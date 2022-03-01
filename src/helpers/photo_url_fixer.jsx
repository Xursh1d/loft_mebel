export const photoUrl = (photo) => {
  if (photo.indexOf("https://") !== -1 || photo.indexOf("http://") !== -1) {
    return photo;
  }
  return `https://www.uktamjon.uz${photo}`;
};
