const getRandomAvatarSource = () => {
  const randomId = Math.floor(Math.random() * 54);
  return `https://xsgames.co/randomusers/assets/avatars/pixel/${randomId}.jpg`;
};

export { getRandomAvatarSource };
