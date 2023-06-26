/* eslint-disable no-await-in-loop */
import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, landscape, testPlacemarks, regensburg } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Placemark API tests", () => {
  let user = null;
  let landscapeCategory = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    landscape.userid = user._id;
    landscapeCategory = await placemarkService.createCategory(landscape)
  });

  teardown(async () => {});

  test("create a placemark", async () => {
    const returnedPlacemark = await placemarkService.createPlacemark(landscapeCategory._id,regensburg);
    assert.isNotNull(returnedPlacemark);
    assertSubset(regensburg, returnedPlacemark);
  });

//   test("delete a placemark", async () => {
//     const placemark = await placemarkService.createPlacemark(landscapeCategory._id,regensburg);
//     const response = await placemarkService.deletePlacemark(placemark._id);
//     // assert.equal(response.status, 204);
//     try {
//       const returnedPlacemark = await placemarkService.getPlacemark(placemark._id);
//       assert.fail("Should not return a response");
//     } catch (error) {
//       assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
//     }
//   });

  test("delete Placemark", async () => {
    for (let i = 0; i < testPlacemarks.length; i+=1) {
        await placemarkService.createPlacemark(landscapeCategory._id, testPlacemarks[i]);
    }

    let returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);

    for (let i = 0; i < returnedPlacemarks.length.length; i+=1) {
        await placemarkService.deletePlacemark(returnedPlacemarks[i]._id);
    }

    returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);

  });

  test("create multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(landscapeCategory._id, testPlacemarks[i]);
    }
    let returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, testPlacemarks.length);
    await placemarkService.deleteAllPlacemarks();
    returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("remove non-existant placemark", async () => {
    try {
      const response = await placemarkService.deletePlacemark("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
    }
  });
});
