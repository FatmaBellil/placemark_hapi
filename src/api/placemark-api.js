import Boom from "@hapi/boom";
import { IdSpec, PlacemarkSpec, PlacemarkSpecPlus, PlacemarkArraySpec, ImageSpec, UploadImageSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },

    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getCategoryPlacemarks(request.params.id);
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all placemarkApi of one Category",
    notes: "returns details of all placemarkApi of one Category",
    response: { schema: PlacemarkArraySpec, failAction: validationError }, //  how to handle validation failures
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
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
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
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        await db.placemarkStore.deletePlacemarkById(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },

    tags: ["api"],
    description: "Delete a specific placemark",
    notes: "a specific placemark removed from Placemark",
    validate: { params: { id: IdSpec },  failAction: validationError },
  },

  // upload and delete image

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      if (!placemark) {
        return Boom.notFound("No Placemark with this id");
      }

      try {
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(file);
          placemark.img = url;
          await db.placemarkStore.updatePlacemark(placemark);
        }
        return h.response(placemark).code(201);
      }
      catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "upload image",
    notes: "upload image",
    validate: { params: { id: IdSpec} ,failAction: validationError },
   
    
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      if (!placemark) {
        return Boom.notFound("No Placemark with this id");
      }

      try {

        await imageStore.deleteImage(request.params.img);
        placemark.img = null;
        await db.placemarkStore.updatePlacemark(placemark);
        return h.response().code(204);

      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete image",
    notes: "delete image",
    validate: { params: { id: IdSpec, img: ImageSpec },  failAction: validationError },
  },

};




