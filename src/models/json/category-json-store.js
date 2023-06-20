import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { placemarkJsonStore } from "./placemark-json-store.js";


const db = new Low(new JSONFile("./src/models/json/categories.json"), { categories: [] });

export const categoryJsonStore = {
    async getAllCategories() {
        await db.read();
        return db.data.categories;

    },

    async addCategory(category) {
        category._id = v4();
        await db.data.categories.push(category);
        await db.write();
        return category;
    },

    async deleteCategoryById(id) {
        await db.read();
        const index = db.data.categories.findIndex((category) => category._id === id);
        if (index !== -1) db.data.categories.splice(index, 1);
        await db.write();
    },
    async getCategoryById(id) {
        await db.read();
        let category = db.data.categories.find((item) => item._id === id);
        if (category) {
            category.placemarks = await placemarkJsonStore.getCategoryPlacemarks(id);
        } else {
            category = null;
        }
        return category;
    },

    async getUserCategories(userid) {
        await db.read();
        return db.data.categories.filter((category) => category.userid === userid);
    },

    async deleteAllCategories() {
        db.data.categories = [];
        await db.write();
    }
}