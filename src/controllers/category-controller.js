import { db } from "../models/db.js";


export const categoryController = {
    index: {
        handler: async function(request, h) {
            const loggedInUser = request.auth.credentials;
            const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
            const viewData = {
                title: "Categories",
                categories: categories
            }

            return h.view("category-view", viewData);
        }
    },

    deletePlacemark: {
        handler: async function(request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.placemarkid);
            placemark._categoryid = null;

            return h.redirect("/categories");
        }
    },

    deleteCategory: {
        handler: async function(request, h) {
            const category = await db.categoryStore.getCategoryById(request.params.id);
            await db.categoryStore.deleteCategoryById(category._id);
            return h.redirect("/categories");
        }
    },
}