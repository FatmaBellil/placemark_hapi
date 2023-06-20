import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";


export const placemarkController = {
    index: {
        handler: async function(request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const viewData = {
                title: "Placemark",
                placemark: placemark,
            };

            return h.view("placemark-view", viewData);
        }
    },
    updatePlacemark: {
        validate: {
            payload: PlacemarkSpec,
            options: {abortEarly: false},
            failAction: async function (request, h, error) {    
                const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
                const viewData = {
                    title: "update placemark error",
                    placemark: placemark,
                    errors: error.details 
                } ;   
                return h.view("placemark-view", viewData).takeover().code(400);
            },
        },
        handler: async function(request, h) {
            const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
            const newPlacemark = {
                name: request.payload.name,
                description: request.payload.description,
                latitude: request.payload.latitude,
                longitude: request.payload.longitude
            }

            await db.placemarkStore.updatePlacemark(placemark, newPlacemark);
            return h.redirect(`/placemark/${request.params.id}`);


        }

    }
}

// upload and delete image