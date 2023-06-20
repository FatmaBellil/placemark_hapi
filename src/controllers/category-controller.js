import { db } from "../models/db.js";
import { CategorySpec, PlacemarkSpec } from "../models/joi-schemas.js";


export const categoryController = {
    index: {
        handler: async function(request, h) {
          const category = await db.categoryStore.getCategoryById(request.params.id);
          const viewData = {
              title: "Category",
              category: category,
          };

          return h.view("category-view", viewData);
        }
    },

    addPlacemark: {
        validate: {
          payload: PlacemarkSpec,
          options: { abortEarly: false },
          failAction: async function (request, h, error) {
            return h.view("category-view", {title: "Add placemark error", errors: error.details}).takeover().code(400);
          },
        },
        handler: async function (request, h) {
          const category = await db.categoryStore.getCategoryById(request.params.id);
          const newPlacemark = {
            name: request.payload.name,
            latitude: request.payload.latitude,
            longitude: request.payload.longitude,
            description: request.payload.description,
          };
          await db.placemarkStore.addPlacemark(category._id,newPlacemark);
          return h.redirect(`/category/${category._id}`);
        },
    },
    
    deletePlacemark: {
        handler: async function (request, h) {
          const category = await db.categoryStore.getCategoryById(request.params.id)
          await db.placemarkStore.deletePlacemarkById(request.params.placemarkid);
          return h.redirect(`/category/${category._id}`);
        },
    },

    
}