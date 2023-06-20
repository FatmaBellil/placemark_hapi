import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacemarks, regensburg, landscape } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {
  let landscapeList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placemarkStore.deleteAllPlacemarks();
    landscapeList = await db.categoryStore.addCategory(landscape);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(landscapeList._id,testPlacemarks[i]);
    }
  });

  test("create a placemark", async () => {
    const placemark = await db.placemarkStore.addPlacemark(landscapeList._id, regensburg);
    assertSubset(regensburg, placemark);
    assert.isDefined(placemark._id);
  });

  test("delete all palcemarks", async () => {
    let returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 3);
    await db.placemarkStore.deleteAllPlacemarks();
    returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("get a Placemark - success", async () => {
    const placemark = await db.placemarkStore.addPlacemark(landscapeList._id, regensburg);
    const returnedPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assertSubset(regensburg, returnedPlacemark);
  });

  test("delete One Placemark - success", async () => {
    const id = testPlacemarks[0]._id;
    await db.placemarkStore.deletePlacemarkById(id);
    const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(id);
    assert.isNull(deletedPlacemark);
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });

  test("delete One placemark - fail", async () => {
    await db.placemarkStore.deletePlacemarkById("bad-id");
    const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(testPlacemarks.length, allPlacemarks.length);
  });
});