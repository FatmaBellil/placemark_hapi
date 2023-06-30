/* eslint-disable prefer-destructuring */
import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };

      return h.view("placemark-view", viewData);
    },
  },
  updatePlacemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const viewData = {
          title: "update placemark error",
          placemark: placemark,
          errors: error.details,
        };
        return h.view("placemark-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      placemark.name = request.payload.name;
      placemark.description = request.payload.description;
      placemark.latitude = request.payload.latitude;
      placemark.longitude = request.payload.longitude;

      await db.placemarkStore.updatePlacemark(placemark);
      return h.redirect(`/placemark/${request.params.id}`);
    },
  },
  // upload and delete image

  uploadImage: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      try {
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          await db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      try {
        const img = request.params.img;
        await imageStore.deleteImage(img.publicId);
        placemark.img = null;
        await db.placemarkStore.updatePlacemark(placemark);
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (error) {
        console.log(error);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
  },
};
