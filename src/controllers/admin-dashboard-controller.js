import { handler } from "@hapi/vision/lib/schemas.js";
import { db } from "../models/db.js";

export const adminDashboardController = {
    index: {
        handler: async function(request, h) {
            const users = await db.placemarkStore.getAllUsers();
            const viewData = {
                title: "Admin Dashboard",
                users: users
            }

            return h.view("admin-dashboard-view", viewData);
        }
    },

    deleteUser: {
        handler: async function(request, h) {
            await db.userStore.deleteUserById(request.id);
            return h.redirect("/admindashboard");
        }
    },

    addUser: {
        handler: async function(request, h) {
            const newUser = {
                firstname: request.payload.firstname,
                lastname: request.payload.lastname,
                email: request.payload.email,
                password: request.payload.password,
            }

            await db.userStore.addUser(newUser);
            return h.redirect("/admindashboard");
        }
    }
}