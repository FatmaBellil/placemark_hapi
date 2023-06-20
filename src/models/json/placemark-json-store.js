import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";


const db = new Low(new JSONFile("./src/models/json/placemarks.json"), { placemarks: [] });
// db.data = { placemarks: [] };


export const placemarkJsonStore = {
    async getAllPlacemarks() {
        await db.read();
        return db.data.placemarks;
    },

    async addPlacemark(categoryid,placemark) {
        await db.read();
        placemark._id = v4();
        placemark.categoryid = categoryid;
        db.data.placemarks.push(placemark);
        await db.write();
        return placemark;
    },

    async getPlacemarkById(id) {
        await db.read();
        let placemark = db.data.placemarks.find((item) => item._id === id);
        if (placemark === undefined) placemark = null;
        return placemark;
    },
    async getCategoryPlacemarks(categoryid) {
        await db.read();
        return db.data.placemarks.filter((placemark) => placemark.categoryid === categoryid);
    },

  

    async deletePlacemarkById(id) {
        await db.read();
        const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
        if (index !== -1) db.data.placemarks.splice(index, 1);
        await db.write();
    },

    async updatePlacemark(placemark, newPlacemark) {
        placemark.name = newPlacemark.name;
        placemark.description = newPlacemark.description;
        placemark.latitude = newPlacemark.latitude;
        placemark.longitude = newPlacemark.longitude;
        db.write();
    },

    async deleteAllPlacemarks() {
        db.data.placemarks = [];
        await db.write();
    }

}