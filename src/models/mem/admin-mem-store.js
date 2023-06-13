import { v4 } from "uuid";



let admins = [];

export const adminMemStore = {
    async getAllAdmins() {
        return admins;
    },

    async getAdminById(id) {
        const admin = admins.find((item) => item._id === id);
        if (admin === undefined) {
            return null;
        }
        return admin;
    },
    async getAdminByEmail(email) {
        const admin = admins.find((item) => item.email === email);
        if (admin === undefined) {
            return null;
        }
        return admin;
    },
    async addAdmin(admin) {
        admin._id = v4();
        admins.push(admin);
        return admin;
    },
    async deleteAdminById(id) {
        const index = admins.findIndex((admin) => admin._id === id);
        if (index !== -1) admins.splice(index, 1);
      },

    async deleteAllAdmins() {
        admins = [];
    }



}