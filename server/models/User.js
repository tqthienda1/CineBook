const users = [];

const findByUsername = async (username) => {
  return users.find(user => user.username === username);
};

const create = async ({ username, password }) => {
  const user = { id: users.length + 1, username, password };
  users.push(user);
  return user;
};

export default {
  findByUsername,
  create,
};
