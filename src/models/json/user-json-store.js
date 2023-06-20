import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/users.json"), { users: [] });
// db.data = { users: [] };


export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    let user = db.data.users.find((item) => item._id === id);
    if (user === undefined) {
      user = null;
    }
    return user;
  },

  async getUserByEmail(email) {
    await db.read();
    let user = db.data.users.find((item) => item.email === email);
    if (user === undefined) {
      user = null;
    }
    return user;
  },

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },

  async updateUser(user, newUser) {
    user.firstName = newUser.firstName;
    user.lasrName = newUser.lastName;
    user.email = newUser.email;
    user.password = newUser.password;
    db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
