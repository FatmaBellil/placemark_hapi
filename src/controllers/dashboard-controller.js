import { db } from "../models/db.js";
import { CategorySpec } from "../models/joi-schemas.js";


export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);

      const viewData = {
        title: "Dashboard",
        user: loggedInUser,
        categories: categories,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCategory: {
    validate: {
      payload: CategorySpec,
      options: {abortEarly: false},
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
        const viewData = {
        title: "add category error",
        user: loggedInUser,
        categories: categories,
        errors: error.details 
        };
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },
    handler: async function(request, h) {
      const loggedInUser = request.auth.credentials;
      const newCategory = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    }
  },

  deleteCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.categoryStore.deleteCategoryById(category._id);
      return h.redirect("/dashboard");
    }
  },
  
};
