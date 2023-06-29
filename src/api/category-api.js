import Boom from "@hapi/boom";
import { IdSpec, CategorySpec, CategorySpecPlus, CategoryArraySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";



export const categoryApi = {
    find: {
        auth: { // This is because these endpoints are now expecting valid tokens.
            strategy: "jwt",
          },
      
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
                // const categories = await db.categoryStore.getAllCategories();
                return categories;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Get all categoryApi",
        notes: "Returns details of all categoryApi",
        response: {schema: CategoryArraySpec, failAction: validationError }
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
    
        handler: async function(request) {
            try {
                const category = await db.categoryStore.getCategoryById(request.params.id);
            if (!category) {
                return Boom.notFound("No Category with this id");
            }
            return category;
            } catch (err) {
            return Boom.serverUnavailable("No Category with this id");
            }
        },
        tags: ["api"],
        description: "Get a specefic category",
        notes: "Returns category details",
        validate:{params: {id: IdSpec}, failAction: validationError},
        response: {schema: CategorySpecPlus, failAction: validationError }
    },
  
    create: {
        auth: {
            strategy: "jwt",
        },
    
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const category = {
                    userid: loggedInUser._id,
                    name: request.payload.name,
                  };
                const newCategory = await db.categoryStore.addCategory(category);
                if (newCategory) {
                    return h.response(newCategory).code(201);
                }
                return Boom.badImplementation("error creating category");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a category",
        notes: "Returns the newly created category",
        validate: { payload: CategorySpec, failAction: validationError },
        response: { schema: CategorySpecPlus, failAction: validationError },
    },
  
    deleteOne: {
        auth: {
            strategy: "jwt",
        },
    
        handler: async function (request, h) {
            try {
                const category = await db.categoryStore.getCategoryById(request.params.id);
                if (!category) {
                    return Boom.notFound("No Category with this id");
                }
                await db.categoryStore.deleteCategoryById(category._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Category with this id");
            }
        },
        tags: ["api"],
        description: "Delete a specific category",
        notes: "a specific category removed from Placemark",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },
  
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
    
        handler: async function (request, h) {
            try {
                await db.categoryStore.deleteAllCategories();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all categoryApi",
        notes: "All categoryApi removed from Placemark",
    },

}