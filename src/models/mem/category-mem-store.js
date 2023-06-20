import { v4 } from "uuid";
import { placemarkMemStore } from "./placemark-mem-store.js";

let categories = [];

export const categoryMemStore = {
    async getAllCategories(){
        return categories;
    },

    async getCategoryById(id) {
        const category = categories.find((item) => item._id === id);
        if (category) {
            category.placemarks = await placemarkMemStore.getCategoryPlacemarks(id);
            return category;
        }
        return null;
    },

    async addCategory(category) {
        category._id = v4();
        categories.push(category);
        return category;
    },

    async getUserCategories(userid) {
        return categories.filter((category) => category.userid === userid);
    },

    async deleteCategoryById(id) {
        const index = categories.findIndex((category) => category._id === id);
        if (index !== -1) categories.splice(index, 1);
    },


    async deleteAllCategories() {
        categories = [];
    },

}