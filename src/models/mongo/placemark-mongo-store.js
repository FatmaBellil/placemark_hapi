import { Placemark } from "./placemark.js"

export const placemarkMongoStore = {

    async getAllPlacemarks() {
        const placemarks = await Placemark.find().lean();
        return placemarks;
    },

    async getPlacemarkById(id) {
        if (id) {
            const placemark = await Placemark.findOne({_id : id}).lean();
            return placemark;
        }
        return null;
    },

    async addPlacemark(categoryid, placemark) {
        placemark.categoryid = categoryid;
        const newPlacemark = new Placemark(placemark);
        const placemarkObj = await newPlacemark.save();
        return this.getPlacemarkById(placemarkObj._id);
    },



    async getCategoryPlacemarks(categoryid) {
        if (categoryid) {
            const placemarks = await Placemark.find({categoryid : categoryid}).lean();
            return placemarks;
        }

        return null;
    },

    async deletePlacemarkById(id) {
        try {
            await Placemark.deleteOne({_id:id});
        }catch(error) {
            console.log("bad id");
        }
    },

    async updatePlacemark(placemark, newPlacemark) {
        placemark.name = newPlacemark.name;
        placemark.description = newPlacemark.description;
        placemark.latitude = newPlacemark.latitude;
        placemark.longitude = newPlacemark.longitude;
        placemark.img = newPlacemark.img;
        await placemark.save();
    },

    async deleteAllPlacemarks() {
        await Placemark.deleteMany({});
    }
}