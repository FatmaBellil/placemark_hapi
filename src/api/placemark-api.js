import  Boom  from "@hapi/boom";
import { IdSpec, PlacemarkSpec, PlacemarkSpecPlus, PlacemarkArraySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";


export const placemarkApi = {

  find: {
    auth: {
      strategy: "jwt",
    },

    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all placemarkApi",
    notes: "returns details of all placemarkApi",
    response: { schema: PlacemarkArraySpec, failAction: validationError}, //  how to handle validation failures
  },
    
  findOne: {
    auth: {
      strategy: "jwt",
    },

    async handler(request) {
        try {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            if (!placemark) {
                return Boom.notFound("No Placemark with this id");
            }
            return placemark;
        } catch (err) {
            return Boom.serverUnavailable("No Placemark with this id");
        }
    },
    tags: ["api"],
    description: "Get a specefic placemark",
    notes: "Returns placemark details",
    validate:{params: {id: IdSpec}, failAction: validationError},
    response: {schema: PlacemarkSpecPlus, failAction: validationError }
  },
  
  create: {
    auth: {
      strategy: "jwt",
    },

    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.addPlacemark(request.params.id, request.payload);
        if (placemark) {
          return h.response(placemark).code(201);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlacemarkSpec, failAction: validationError }, // Playload or params
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
    },
  
  deleteAll: {
    auth: {
      strategy: "jwt",
    },

    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placemarkApi",
    notes: "All placemarkApi removed from Placemark",
  },
  
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        await db.placemarkStore.deletePlacemarkById(placemark._id);
        return h.response().code(204);
      } catch(err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },

    tags: ["api"],
    description: "Delete a specific placemark",
    notes: "a specific placemark removed from Placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
}