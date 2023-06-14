import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    const user = users.find((item) => item._id === id);
    if (user === undefined) {
        return null;
    }
    return user;

  },

  async getUserByEmail(email) {
    const user = users.find((item) => item.email === email);
    if (user === undefined) {
        return null;
    }
    return user;
  },

  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) users.splice(index, 1);
  },

  async updateUser(user, newUser) {
    user.firstName = newUser.firstName;
    user.lasrName = newUser.lastName;
    user.email = newUser.email;
    user.password = newUser.password;

  },

  async deleteAll() {
    users = [];
  },
};
