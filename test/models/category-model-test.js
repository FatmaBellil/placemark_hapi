import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { landscape, testCategories } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


suite("Category Model tests", () => {

    setup(async () => {
        db.init("mongo");
        await db.categoryStore.deleteAllCategories();
        for (let i = 0; i < testCategories.length; i+=1) {
            // eslint-disable-next-line no-await-in-loop
            testCategories[i] = await db.categoryStore.addCategory(testCategories[i]);  
        }
    });

    test("create a category", async () => {
        const category = await db.categoryStore.addCategory(landscape);
        assertSubset(landscape, category);
        assert.isDefined(category._id);
    });

    test("delete all categories", async () => {
        let returnedCategories = await db.categoryStore.getAllCategories();
        assert.equal(returnedCategories.length, 3);
        await db.categoryStore.deleteAllCategories(); 
        returnedCategories = await db.categoryStore.getAllCategories();
        assert.equal(returnedCategories, 0);

    });

    test("get a category - success", async () => {
        const category = await db.categoryStore.addCategory(landscape);
        const returnedCategory = await db.categoryStore.getCategoryById(category._id); 
        assertSubset(landscape, returnedCategory);

    });
    
    test("delete one category - success", async () => {
        const id = testCategories[0]._id;
        await db.categoryStore.deleteCategoryById(id);
        const returnedCategories = await db.categoryStore.getAllCategories();
        assert.equal(returnedCategories.length, testCategories.length - 1);
        const deletedCategory = await db.categoryStore.getCategoryById(id);
        assert.isNull(deletedCategory);

    });

    test("get a category - bad params", async () => {
        assert.isNull(await db.categoryStore.getCategoryById(""));
        assert.isNull(await db.categoryStore.getCategoryById());

    });

    test("delete a category - fail", async () => {
        await db.categoryStore.deleteCategoryById("bad-id");
        const allCategories = await db.categoryStore.getAllCategories();
        assert.equal(testCategories.length, allCategories.length);
    });




})