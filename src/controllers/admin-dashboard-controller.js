import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";

export const adminDashboardController = {
    index: {
        handler: async function(request, h) {
            const users = await db.userStore.getAllUsers();
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
        validate: {
            payload: UserSpec,
            options: { abortEarly: false },
            failAction: async function (request, h, error) {
                const users = await db.userStore.getAllUsers();
                const viewData = {
                title: "add user error",
                users: users,
                errors: error.details 
            }
              return h.view("admin-dashboard-view", viewData).takeover().code(400);
            },
        },
        handler: async function(request, h) {
            const user = request.payload;
            user.role = "basic";
            await db.userStore.addUser(user);

            return h.redirect("/admindashboard");
        }
    }
}