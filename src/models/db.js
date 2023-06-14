import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";



export const db = {
    userStore : null,
    placemarkStore: null,
    categoryStore: null,

    init(storeType) {
        switch(storeType) {
            case "json":
                this.userStore = userJsonStore;
                this.placemarkStore = placemarkJsonStore;
                this.categoryStore = categoryJsonStore;
                break;
            default:
                this.userStore = userMemStore;
                this.placemarkStore = placemarkMemStore;
                this.categoryStore = categoryMemStore;
        }
    },
};