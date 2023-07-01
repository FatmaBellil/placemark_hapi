import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";

export const userController = {
    index: {
        handler: async function(request, h) {
            const user = await db.userStore.getUserById(request.params.id);
            const viewData = {
                title: "User details",
                user: user
            };
            return h.view("user-view", viewData);
        }
    },
    updateUser: {
        validate: {
            payload: UserSpec,
            options: { abortEarly: false },
            failAction: async function (request, h, error) {
              const user = await db.userStore.getUserById(request.params.id);
              const viewData = {
                title: "update user error",
                user: user,
                errors: error.details 
            };
              return h.view("user-view", viewData).takeover().code(400);
            },
        },
        handler: async function(request, h) {
            const user = await db.userStore.getUserById(request.params.id);
            user.firstName = request.payload.firstName;
            user.lastName = request.payload.lastName;
            user.email = request.payload.email;
            user.password = request.payload.password;
            await db.userStore.updateUser(user);
            return h.redirect(`/user/${request.params.id}`);
        }
    
    
    }
    
}