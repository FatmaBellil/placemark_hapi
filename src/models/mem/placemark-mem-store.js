import { v4 } from "uuid";

let placemarks = [];

export const placemarkMemStore = {
    async getAllPlacemarks() {
        return placemarks;
    },

    async addPlacemark(placemark) {
        placemark._id = v4();
        placemarks.push(placemark);
        return placemark;
    },

    async getPlacemarkById(id) {
        const placemark = placemarks.find((item) => item._id === id);
        if (placemark === undefined) {
            return null;
        }
        return placemark;
    },

    async getUserPlacemarks(userid) {
        return placemarks.filter((placemark) => placemark.userid === userid);
    },

    async deletePlacemarkById(id) {
        const index = placemarks.find((placemark) => placemark._id === id);
        if (index !== -1) placemarks.splice(index, 1);
    },

    async deleteAllPlacemarks() {
        placemarks = [];
    },


}